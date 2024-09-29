import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocType } from '../../models/constants/doctype.model';
@Injectable({
  providedIn: 'root'
})
export class DocTypeService {

  constructor(private http: HttpClient) { }

  AddDocType(payLoad: DocType): Observable<DocType> {
    return this.http.post<DocType>(`${environment.backendUrl + environment.hrUrl}DocType/CreateDocType`, payLoad);
  }

  UpdateDocType(payLoad: DocType): Observable<DocType> {
    return this.http.put<DocType>(`${environment.backendUrl + environment.hrUrl}DocType/UpdateDocType`, payLoad);
  }

  DeleteDocType(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}DocType/DeleteDocType?id=${Id}`);
  }
  GetAllDocTypes(payLoad: string): Observable<DocType[]> {
    return this.http.get<DocType[]>(`${environment.backendUrl + environment.hrUrl}DocType/GetDocTypes?${payLoad}`);
  }

  GetDocTypesInfo(payLoad: string): Observable<DocType[]> {
    return this.http.get<DocType[]>(`${environment.backendUrl + environment.hrUrl}DocType/GetDocTypesInfo?${payLoad}`);
  }
}