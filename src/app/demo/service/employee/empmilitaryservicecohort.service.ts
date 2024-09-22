import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpMilitaryServiceCohort } from '../../models/employee/empmilitaryservicecohort.model';
@Injectable({
  providedIn: 'root'
})
export class EmpMilitaryServiceCohortService {

  constructor(private http: HttpClient) { }

  AddEmpMilitaryServiceCohort(payLoad: EmpMilitaryServiceCohort): Observable<EmpMilitaryServiceCohort> {
    return this.http.post<EmpMilitaryServiceCohort>(`${environment.backendUrl + environment.hrUrl}EmpMilitaryServiceCohort/CreateEmpMilitaryServiceCohort`, payLoad);
  }

  UpdateEmpMilitaryServiceCohort(payLoad: EmpMilitaryServiceCohort): Observable<EmpMilitaryServiceCohort> {
    return this.http.put<EmpMilitaryServiceCohort>(`${environment.backendUrl + environment.hrUrl}EmpMilitaryServiceCohort/UpdateEmpMilitaryServiceCohort`, payLoad);
  }

  DeleteEmpMilitaryServiceCohort(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpMilitaryServiceCohort/DeleteEmpMilitaryServiceCohort?id=${Id}`);
  }
  GetAllEmpMilitaryServiceCohorts(payLoad: string): Observable<EmpMilitaryServiceCohort[]> {
    return this.http.get<EmpMilitaryServiceCohort[]>(`${environment.backendUrl + environment.hrUrl}EmpMilitaryServiceCohort/GetEmpMilitaryServiceCohorts?${payLoad}`);
  }

  GetEmpMilitaryServiceCohortsInfo(payLoad: string): Observable<EmpMilitaryServiceCohort[]> {
    return this.http.get<EmpMilitaryServiceCohort[]>(`${environment.backendUrl + environment.hrUrl}EmpMilitaryServiceCohort/GetEmpMilitaryServiceCohortsInfo?${payLoad}`);
  }
}