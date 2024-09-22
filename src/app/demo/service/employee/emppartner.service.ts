import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpPartner } from '../../models/employee/emppartner.model';
@Injectable({
  providedIn: 'root'
})
export class EmpPartnerService {

  constructor(private http: HttpClient) { }

  AddEmpPartner(payLoad: EmpPartner): Observable<EmpPartner> {
    return this.http.post<EmpPartner>(`${environment.backendUrl + environment.hrUrl}EmpPartner/CreateEmpPartner`, payLoad);
  }

  UpdateEmpPartner(payLoad: EmpPartner): Observable<EmpPartner> {
    return this.http.put<EmpPartner>(`${environment.backendUrl + environment.hrUrl}EmpPartner/UpdateEmpPartner`, payLoad);
  }

  DeleteEmpPartner(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpPartner/DeleteEmpPartner?id=${Id}`);
  }
  GetAllEmpPartners(payLoad: string): Observable<EmpPartner[]> {
    return this.http.get<EmpPartner[]>(`${environment.backendUrl + environment.hrUrl}EmpPartner/GetEmpPartners?${payLoad}`);
  }

  GetEmpPartnersInfo(payLoad: string): Observable<EmpPartner[]> {
    return this.http.get<EmpPartner[]>(`${environment.backendUrl + environment.hrUrl}EmpPartner/GetEmpPartnersInfo?${payLoad}`);
  }
}