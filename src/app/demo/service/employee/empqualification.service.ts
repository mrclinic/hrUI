import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpQualification } from '../../models/employee/empqualification.model';
@Injectable({
  providedIn: 'root'
})
export class EmpQualificationService {

  constructor(private http: HttpClient) { }

  AddEmpQualification(payLoad: EmpQualification): Observable<EmpQualification> {
    return this.http.post<EmpQualification>(`${environment.backendUrl + environment.hrUrl}EmpQualification/CreateEmpQualification`, payLoad);
  }

  UpdateEmpQualification(payLoad: EmpQualification): Observable<EmpQualification> {
    return this.http.put<EmpQualification>(`${environment.backendUrl + environment.hrUrl}EmpQualification/UpdateEmpQualification`, payLoad);
  }

  DeleteEmpQualification(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpQualification/DeleteEmpQualification?id=${Id}`);
  }
  GetAllEmpQualifications(payLoad: string): Observable<EmpQualification[]> {
    return this.http.get<EmpQualification[]>(`${environment.backendUrl + environment.hrUrl}EmpQualification/GetEmpQualifications?${payLoad}`);
  }

  GetEmpQualificationsInfo(payLoad: string): Observable<EmpQualification[]> {
    return this.http.get<EmpQualification[]>(`${environment.backendUrl + environment.hrUrl}EmpQualification/GetEmpQualificationsInfo?${payLoad}`);
  }
}