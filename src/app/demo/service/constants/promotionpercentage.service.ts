import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PromotionPercentage } from '../../models/constants/promotionpercentage.model';
@Injectable({
  providedIn: 'root'
})
export class PromotionPercentageService {

  constructor(private http: HttpClient) { }

  AddPromotionPercentage(payLoad: PromotionPercentage): Observable<PromotionPercentage> {
    return this.http.post<PromotionPercentage>(`${environment.backendUrl + environment.hrUrl}PromotionPercentage/CreatePromotionPercentage`, payLoad);
  }

  UpdatePromotionPercentage(payLoad: PromotionPercentage): Observable<PromotionPercentage> {
    return this.http.put<PromotionPercentage>(`${environment.backendUrl + environment.hrUrl}PromotionPercentage/UpdatePromotionPercentage`, payLoad);
  }

  DeletePromotionPercentage(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}PromotionPercentage/DeletePromotionPercentage?id=${Id}`);
  }
  GetAllPromotionPercentages(payLoad: string): Observable<PromotionPercentage[]> {
    return this.http.get<PromotionPercentage[]>(`${environment.backendUrl + environment.hrUrl}PromotionPercentage/GetPromotionPercentages?${payLoad}`);
  }

  GetPromotionPercentagesInfo(payLoad: string): Observable<PromotionPercentage[]> {
    return this.http.get<PromotionPercentage[]>(`${environment.backendUrl + environment.hrUrl}PromotionPercentage/GetPromotionPercentagesInfo?${payLoad}`);
  }
}