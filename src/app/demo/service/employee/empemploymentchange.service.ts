import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpEmploymentChange } from '../../models/employee/empemploymentchange.model';
@Injectable({
  providedIn: 'root'
})
export class EmpEmploymentChangeService {

  constructor(private http: HttpClient) { }

  AddEmpEmploymentChange(payLoad: EmpEmploymentChange): Observable<EmpEmploymentChange> {
    return this.http.post<EmpEmploymentChange>(`${environment.backendUrl + environment.hrUrl}EmpEmploymentChange/CreateEmpEmploymentChange`, payLoad);
  }

  UpdateEmpEmploymentChange(payLoad: EmpEmploymentChange): Observable<EmpEmploymentChange> {
    return this.http.put<EmpEmploymentChange>(`${environment.backendUrl + environment.hrUrl}EmpEmploymentChange/UpdateEmpEmploymentChange`, payLoad);
  }

  DeleteEmpEmploymentChange(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpEmploymentChange/DeleteEmpEmploymentChange?id=${Id}`);
  }
  GetAllEmpEmploymentChanges(payLoad: string): Observable<EmpEmploymentChange[]> {
    return this.http.get<EmpEmploymentChange[]>(`${environment.backendUrl + environment.hrUrl}EmpEmploymentChange/GetEmpEmploymentChanges?${payLoad}`);
  }

  GetEmpEmploymentChangesInfo(payLoad: string): Observable<EmpEmploymentChange[]> {
    return this.http.get<EmpEmploymentChange[]>(`${environment.backendUrl + environment.hrUrl}EmpEmploymentChange/GetEmpEmploymentChangesInfo?${payLoad}`);
  }
}