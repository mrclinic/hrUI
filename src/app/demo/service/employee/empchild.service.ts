import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpChild } from '../../models/employee/empchild.model';
@Injectable({
  providedIn: 'root'
})
export class EmpChildService {

  constructor(private http: HttpClient) { }

  AddEmpChild(payLoad: EmpChild): Observable<EmpChild> {
    return this.http.post<EmpChild>(`${environment.backendUrl + environment.hrUrl}EmpChild/CreateEmpChild`, payLoad);
  }

  UpdateEmpChild(payLoad: EmpChild): Observable<EmpChild> {
    return this.http.put<EmpChild>(`${environment.backendUrl + environment.hrUrl}EmpChild/UpdateEmpChild`, payLoad);
  }

  DeleteEmpChild(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpChild/DeleteEmpChild?id=${Id}`);
  }
  GetAllEmpChilds(payLoad: string): Observable<EmpChild[]> {
    return this.http.get<EmpChild[]>(`${environment.backendUrl + environment.hrUrl}EmpChild/GetEmpChilds?${payLoad}`);
  }

  GetEmpChildsInfo(payLoad: string): Observable<EmpChild[]> {
    return this.http.get<EmpChild[]>(`${environment.backendUrl + environment.hrUrl}EmpChild/GetEmpChildsInfo?${payLoad}`);
  }
}