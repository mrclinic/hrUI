import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RewardType } from '../../models/constants/rewardtype.model';
@Injectable({
  providedIn: 'root'
})
export class RewardTypeService {

  constructor(private http: HttpClient) { }

  AddRewardType(payLoad: RewardType): Observable<RewardType> {
    return this.http.post<RewardType>(`${environment.backendUrl + environment.hrUrl}RewardType/CreateRewardType`, payLoad);
  }

  UpdateRewardType(payLoad: RewardType): Observable<RewardType> {
    return this.http.put<RewardType>(`${environment.backendUrl + environment.hrUrl}RewardType/UpdateRewardType`, payLoad);
  }

  DeleteRewardType(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}RewardType/DeleteRewardType?id=${Id}`);
  }
  GetAllRewardTypes(payLoad: string): Observable<RewardType[]> {
    return this.http.get<RewardType[]>(`${environment.backendUrl + environment.hrUrl}RewardType/GetRewardTypes?${payLoad}`);
  }

  GetRewardTypesInfo(payLoad: string): Observable<RewardType[]> {
    return this.http.get<RewardType[]>(`${environment.backendUrl + environment.hrUrl}RewardType/GetRewardTypesInfo?${payLoad}`);
  }
}