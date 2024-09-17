import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HealthyStatus } from '../../models/constants/healthystatus.model';
@Injectable({
  providedIn: 'root'
})
export class HealthyStatusService {

  constructor(private http: HttpClient) { }

  AddHealthyStatus(payLoad: HealthyStatus): Observable<HealthyStatus> {
    return this.http.post<HealthyStatus>(`${environment.backendUrl + environment.hrUrl}HealthyStatus/CreateHealthyStatus`, payLoad);
  }

  UpdateHealthyStatus(payLoad: HealthyStatus): Observable<HealthyStatus> {
    return this.http.put<HealthyStatus>(`${environment.backendUrl + environment.hrUrl}HealthyStatus/UpdateHealthyStatus`, payLoad);
  }

  DeleteHealthyStatus(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}HealthyStatus/DeleteHealthyStatus?id=${Id}`);
  }
  GetAllHealthyStatuss(payLoad: string): Observable<HealthyStatus[]> {
    return this.http.get<HealthyStatus[]>(`${environment.backendUrl + environment.hrUrl}HealthyStatus/GetHealthyStatuss?${payLoad}`);
  }

  GetHealthyStatussInfo(payLoad: string): Observable<HealthyStatus[]> {
    return this.http.get<HealthyStatus[]>(`${environment.backendUrl + environment.hrUrl}HealthyStatus/GetHealthyStatussInfo?${payLoad}`);
  }
}