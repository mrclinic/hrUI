import { HttpClient } from '@angular/common/http';
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
}