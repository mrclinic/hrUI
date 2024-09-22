import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpPromotion } from '../../models/employee/emppromotion.model';
@Injectable({
  providedIn: 'root'
})
export class EmpPromotionService {

  constructor(private http: HttpClient) { }

  AddEmpPromotion(payLoad: EmpPromotion): Observable<EmpPromotion> {
    return this.http.post<EmpPromotion>(`${environment.backendUrl + environment.hrUrl}EmpPromotion/CreateEmpPromotion`, payLoad);
  }

  UpdateEmpPromotion(payLoad: EmpPromotion): Observable<EmpPromotion> {
    return this.http.put<EmpPromotion>(`${environment.backendUrl + environment.hrUrl}EmpPromotion/UpdateEmpPromotion`, payLoad);
  }

  DeleteEmpPromotion(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpPromotion/DeleteEmpPromotion?id=${Id}`);
  }
  GetAllEmpPromotions(payLoad: string): Observable<EmpPromotion[]> {
    return this.http.get<EmpPromotion[]>(`${environment.backendUrl + environment.hrUrl}EmpPromotion/GetEmpPromotions?${payLoad}`);
  }

  GetEmpPromotionsInfo(payLoad: string): Observable<EmpPromotion[]> {
    return this.http.get<EmpPromotion[]>(`${environment.backendUrl + environment.hrUrl}EmpPromotion/GetEmpPromotionsInfo?${payLoad}`);
  }
}