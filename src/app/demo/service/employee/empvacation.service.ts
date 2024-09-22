import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpVacation } from '../../models/employee/empvacation.model';
@Injectable({
  providedIn: 'root'
})
export class EmpVacationService {

  constructor(private http: HttpClient) { }

  AddEmpVacation(payLoad: EmpVacation): Observable<EmpVacation> {
    return this.http.post<EmpVacation>(`${environment.backendUrl + environment.hrUrl}EmpVacation/CreateEmpVacation`, payLoad);
  }

  UpdateEmpVacation(payLoad: EmpVacation): Observable<EmpVacation> {
    return this.http.put<EmpVacation>(`${environment.backendUrl + environment.hrUrl}EmpVacation/UpdateEmpVacation`, payLoad);
  }

  DeleteEmpVacation(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpVacation/DeleteEmpVacation?id=${Id}`);
  }
  GetAllEmpVacations(payLoad: string): Observable<EmpVacation[]> {
    return this.http.get<EmpVacation[]>(`${environment.backendUrl + environment.hrUrl}EmpVacation/GetEmpVacations?${payLoad}`);
  }

  GetEmpVacationsInfo(payLoad: string): Observable<EmpVacation[]> {
    return this.http.get<EmpVacation[]>(`${environment.backendUrl + environment.hrUrl}EmpVacation/GetEmpVacationsInfo?${payLoad}`);
  }
}