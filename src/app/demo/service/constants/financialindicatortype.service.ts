import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FinancialIndicatorType } from '../../models/constants/financialindicatortype.model';
@Injectable({
  providedIn: 'root'
})
export class FinancialIndicatorTypeService {

  constructor(private http: HttpClient) { }

  AddFinancialIndicatorType(payLoad: FinancialIndicatorType): Observable<FinancialIndicatorType> {
    return this.http.post<FinancialIndicatorType>(`${environment.backendUrl + environment.hrUrl}FinancialIndicatorType/CreateFinancialIndicatorType`, payLoad);
  }

  UpdateFinancialIndicatorType(payLoad: FinancialIndicatorType): Observable<FinancialIndicatorType> {
    return this.http.put<FinancialIndicatorType>(`${environment.backendUrl + environment.hrUrl}FinancialIndicatorType/UpdateFinancialIndicatorType`, payLoad);
  }

  DeleteFinancialIndicatorType(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}FinancialIndicatorType/DeleteFinancialIndicatorType?id=${Id}`);
  }
  GetAllFinancialIndicatorTypes(payLoad: string): Observable<FinancialIndicatorType[]> {
    return this.http.get<FinancialIndicatorType[]>(`${environment.backendUrl + environment.hrUrl}FinancialIndicatorType/GetFinancialIndicatorTypes?${payLoad}`);
  }

  GetFinancialIndicatorTypesInfo(payLoad: string): Observable<FinancialIndicatorType[]> {
    return this.http.get<FinancialIndicatorType[]>(`${environment.backendUrl + environment.hrUrl}FinancialIndicatorType/GetFinancialIndicatorTypesInfo?${payLoad}`);
  }
}