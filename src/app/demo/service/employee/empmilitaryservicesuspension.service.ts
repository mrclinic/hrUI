import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpMilitaryServiceSuspension } from '../../models/employee/empmilitaryservicesuspension.model';
@Injectable({
  providedIn: 'root'
})
export class EmpMilitaryServiceSuspensionService {

  constructor(private http: HttpClient) { }

  AddEmpMilitaryServiceSuspension(payLoad: EmpMilitaryServiceSuspension): Observable<EmpMilitaryServiceSuspension> {
    return this.http.post<EmpMilitaryServiceSuspension>(`${environment.backendUrl + environment.hrUrl}EmpMilitaryServiceSuspension/CreateEmpMilitaryServiceSuspension`, payLoad);
  }

  UpdateEmpMilitaryServiceSuspension(payLoad: EmpMilitaryServiceSuspension): Observable<EmpMilitaryServiceSuspension> {
    return this.http.put<EmpMilitaryServiceSuspension>(`${environment.backendUrl + environment.hrUrl}EmpMilitaryServiceSuspension/UpdateEmpMilitaryServiceSuspension`, payLoad);
  }

  DeleteEmpMilitaryServiceSuspension(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpMilitaryServiceSuspension/DeleteEmpMilitaryServiceSuspension?id=${Id}`);
  }
  GetAllEmpMilitaryServiceSuspensions(payLoad: string): Observable<EmpMilitaryServiceSuspension[]> {
    return this.http.get<EmpMilitaryServiceSuspension[]>(`${environment.backendUrl + environment.hrUrl}EmpMilitaryServiceSuspension/GetEmpMilitaryServiceSuspensions?${payLoad}`);
  }

  GetEmpMilitaryServiceSuspensionsInfo(payLoad: string): Observable<EmpMilitaryServiceSuspension[]> {
    return this.http.get<EmpMilitaryServiceSuspension[]>(`${environment.backendUrl + environment.hrUrl}EmpMilitaryServiceSuspension/GetEmpMilitaryServiceSuspensionsInfo?${payLoad}`);
  }
}