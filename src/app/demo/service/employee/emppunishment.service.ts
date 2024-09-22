import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpPunishment } from '../../models/employee/emppunishment.model';
@Injectable({
  providedIn: 'root'
})
export class EmpPunishmentService {

  constructor(private http: HttpClient) { }

  AddEmpPunishment(payLoad: EmpPunishment): Observable<EmpPunishment> {
    return this.http.post<EmpPunishment>(`${environment.backendUrl + environment.hrUrl}EmpPunishment/CreateEmpPunishment`, payLoad);
  }

  UpdateEmpPunishment(payLoad: EmpPunishment): Observable<EmpPunishment> {
    return this.http.put<EmpPunishment>(`${environment.backendUrl + environment.hrUrl}EmpPunishment/UpdateEmpPunishment`, payLoad);
  }

  DeleteEmpPunishment(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpPunishment/DeleteEmpPunishment?id=${Id}`);
  }
  GetAllEmpPunishments(payLoad: string): Observable<EmpPunishment[]> {
    return this.http.get<EmpPunishment[]>(`${environment.backendUrl + environment.hrUrl}EmpPunishment/GetEmpPunishments?${payLoad}`);
  }

  GetEmpPunishmentsInfo(payLoad: string): Observable<EmpPunishment[]> {
    return this.http.get<EmpPunishment[]>(`${environment.backendUrl + environment.hrUrl}EmpPunishment/GetEmpPunishmentsInfo?${payLoad}`);
  }
}