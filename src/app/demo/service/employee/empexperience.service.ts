import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpExperience } from '../../models/employee/empexperience.model';
@Injectable({
  providedIn: 'root'
})
export class EmpExperienceService {

  constructor(private http: HttpClient) { }

  AddEmpExperience(payLoad: EmpExperience): Observable<EmpExperience> {
    return this.http.post<EmpExperience>(`${environment.backendUrl + environment.hrUrl}EmpExperience/CreateEmpExperience`, payLoad);
  }

  UpdateEmpExperience(payLoad: EmpExperience): Observable<EmpExperience> {
    return this.http.put<EmpExperience>(`${environment.backendUrl + environment.hrUrl}EmpExperience/UpdateEmpExperience`, payLoad);
  }

  DeleteEmpExperience(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpExperience/DeleteEmpExperience?id=${Id}`);
  }
  GetAllEmpExperiences(payLoad: string): Observable<EmpExperience[]> {
    return this.http.get<EmpExperience[]>(`${environment.backendUrl + environment.hrUrl}EmpExperience/GetEmpExperiences?${payLoad}`);
  }

  GetEmpExperiencesInfo(payLoad: string): Observable<EmpExperience[]> {
    return this.http.get<EmpExperience[]>(`${environment.backendUrl + environment.hrUrl}EmpExperience/GetEmpExperiencesInfo?${payLoad}`);
  }
}