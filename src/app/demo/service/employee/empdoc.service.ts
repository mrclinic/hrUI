import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpDoc } from '../../models/employee/empdoc.model';
@Injectable({
  providedIn: 'root'
})
export class EmpDocService {

  constructor(private http: HttpClient) { }

  AddEmpDoc(payLoad: EmpDoc): Observable<EmpDoc> {
    return this.http.post<EmpDoc>(`${environment.backendUrl + environment.hrUrl}EmpDoc/CreateEmpDoc`, payLoad);
  }

  UpdateEmpDoc(payLoad: EmpDoc): Observable<EmpDoc> {
    return this.http.put<EmpDoc>(`${environment.backendUrl + environment.hrUrl}EmpDoc/UpdateEmpDoc`, payLoad);
  }

  DeleteEmpDoc(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpDoc/DeleteEmpDoc?id=${Id}`);
  }
  GetAllEmpDocs(payLoad: string): Observable<EmpDoc[]> {
    return this.http.get<EmpDoc[]>(`${environment.backendUrl + environment.hrUrl}EmpDoc/GetEmpDocs?${payLoad}`);
  }

  GetEmpDocsInfo(payLoad: string): Observable<EmpDoc[]> {
    return this.http.get<EmpDoc[]>(`${environment.backendUrl + environment.hrUrl}EmpDoc/GetEmpDocsInfo?${payLoad}`);
  }

  DownloadEmpDoc(Id: string, type: string, name: string) {
    return this.http.get(`${environment.backendUrl + environment.hrUrl}EmpDoc/DownloadEmpDoc?id=${Id}`, {
      responseType: 'arraybuffer', headers: new HttpHeaders()
    }).subscribe(response => this.downloadFile(response, type, name));
  }
  downloadFile(data: any, type: string, name: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove(); // remove the element
  }

  UploadEmpDoc(payLoad: any[], docInfo: any) {
    var formData = new FormData();
    Array.from(payLoad).forEach(f => formData.append('files', f));
    Object.keys(docInfo).forEach(key => formData.append(key, docInfo[key]));
    return this.http.post(`${environment.backendUrl + environment.hrUrl}EmpDoc/UploadEmpDoc`, formData);
  }
}