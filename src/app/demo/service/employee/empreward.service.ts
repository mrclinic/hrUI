import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpReward } from '../../models/employee/empreward.model';
@Injectable({
  providedIn: 'root'
})
export class EmpRewardService {

  constructor(private http: HttpClient) { }

  AddEmpReward(payLoad: EmpReward): Observable<EmpReward> {
    return this.http.post<EmpReward>(`${environment.backendUrl + environment.hrUrl}EmpReward/CreateEmpReward`, payLoad);
  }

  UpdateEmpReward(payLoad: EmpReward): Observable<EmpReward> {
    return this.http.put<EmpReward>(`${environment.backendUrl + environment.hrUrl}EmpReward/UpdateEmpReward`, payLoad);
  }

  DeleteEmpReward(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpReward/DeleteEmpReward?id=${Id}`);
  }
  GetAllEmpRewards(payLoad: string): Observable<EmpReward[]> {
    return this.http.get<EmpReward[]>(`${environment.backendUrl + environment.hrUrl}EmpReward/GetEmpRewards?${payLoad}`);
  }

  GetEmpRewardsInfo(payLoad: string): Observable<EmpReward[]> {
    return this.http.get<EmpReward[]>(`${environment.backendUrl + environment.hrUrl}EmpReward/GetEmpRewardsInfo?${payLoad}`);
  }
}