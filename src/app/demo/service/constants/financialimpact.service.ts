import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FinancialImpact } from '../../models/constants/financialimpact.model';
@Injectable({
  providedIn: 'root'
})
export class FinancialImpactService {

  constructor(private http: HttpClient) { }

  AddFinancialImpact(payLoad: FinancialImpact): Observable<FinancialImpact> {
    return this.http.post<FinancialImpact>(`${environment.backendUrl + environment.hrUrl}FinancialImpact/CreateFinancialImpact`, payLoad);
  }

  UpdateFinancialImpact(payLoad: FinancialImpact): Observable<FinancialImpact> {
    return this.http.put<FinancialImpact>(`${environment.backendUrl + environment.hrUrl}FinancialImpact/UpdateFinancialImpact`, payLoad);
  }

  DeleteFinancialImpact(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}FinancialImpact/DeleteFinancialImpact?id=${Id}`);
  }
  GetAllFinancialImpacts(payLoad: string): Observable<FinancialImpact[]> {
    return this.http.get<FinancialImpact[]>(`${environment.backendUrl + environment.hrUrl}FinancialImpact/GetFinancialImpacts?${payLoad}`);
  }

  GetFinancialImpactsInfo(payLoad: string): Observable<FinancialImpact[]> {
    return this.http.get<FinancialImpact[]>(`${environment.backendUrl + environment.hrUrl}FinancialImpact/GetFinancialImpactsInfo?${payLoad}`);
  }
}