import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InsuranceSystem } from '../../models/constants/insurancesystem.model';
@Injectable({
  providedIn: 'root'
})
export class InsuranceSystemService {

  constructor(private http: HttpClient) { }

  AddInsuranceSystem(payLoad: InsuranceSystem): Observable<InsuranceSystem> {
    return this.http.post<InsuranceSystem>(`${environment.backendUrl + environment.hrUrl}InsuranceSystem/CreateInsuranceSystem`, payLoad);
  }

  UpdateInsuranceSystem(payLoad: InsuranceSystem): Observable<InsuranceSystem> {
    return this.http.put<InsuranceSystem>(`${environment.backendUrl + environment.hrUrl}InsuranceSystem/UpdateInsuranceSystem`, payLoad);
  }

  DeleteInsuranceSystem(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}InsuranceSystem/DeleteInsuranceSystem?id=${Id}`);
  }
  GetAllInsuranceSystems(payLoad: string): Observable<InsuranceSystem[]> {
    return this.http.get<InsuranceSystem[]>(`${environment.backendUrl + environment.hrUrl}InsuranceSystem/GetInsuranceSystems?${payLoad}`);
  }

  GetInsuranceSystemsInfo(payLoad: string): Observable<InsuranceSystem[]> {
    return this.http.get<InsuranceSystem[]>(`${environment.backendUrl + environment.hrUrl}InsuranceSystem/GetInsuranceSystemsInfo?${payLoad}`);
  }
}