import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpRelinquishment } from '../../models/employee/emprelinquishment.model';
@Injectable({
  providedIn: 'root'
})
export class EmpRelinquishmentService {

  constructor(private http: HttpClient) { }

  AddEmpRelinquishment(payLoad: EmpRelinquishment): Observable<EmpRelinquishment> {
    return this.http.post<EmpRelinquishment>(`${environment.backendUrl + environment.hrUrl}EmpRelinquishment/CreateEmpRelinquishment`, payLoad);
  }

  UpdateEmpRelinquishment(payLoad: EmpRelinquishment): Observable<EmpRelinquishment> {
    return this.http.put<EmpRelinquishment>(`${environment.backendUrl + environment.hrUrl}EmpRelinquishment/UpdateEmpRelinquishment`, payLoad);
  }

  DeleteEmpRelinquishment(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpRelinquishment/DeleteEmpRelinquishment?id=${Id}`);
  }
  GetAllEmpRelinquishments(payLoad: string): Observable<EmpRelinquishment[]> {
    return this.http.get<EmpRelinquishment[]>(`${environment.backendUrl + environment.hrUrl}EmpRelinquishment/GetEmpRelinquishments?${payLoad}`);
  }

  GetEmpRelinquishmentsInfo(payLoad: string): Observable<EmpRelinquishment[]> {
    return this.http.get<EmpRelinquishment[]>(`${environment.backendUrl + environment.hrUrl}EmpRelinquishment/GetEmpRelinquishmentsInfo?${payLoad}`);
  }
}