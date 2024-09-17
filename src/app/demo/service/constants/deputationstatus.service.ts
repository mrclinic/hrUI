import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeputationStatus } from '../../models/constants/deputationstatus.model';
@Injectable({
  providedIn: 'root'
})
export class DeputationStatusService {

  constructor(private http: HttpClient) { }

  AddDeputationStatus(payLoad: DeputationStatus): Observable<DeputationStatus> {
    return this.http.post<DeputationStatus>(`${environment.backendUrl + environment.hrUrl}DeputationStatus/CreateDeputationStatus`, payLoad);
  }

  UpdateDeputationStatus(payLoad: DeputationStatus): Observable<DeputationStatus> {
    return this.http.put<DeputationStatus>(`${environment.backendUrl + environment.hrUrl}DeputationStatus/UpdateDeputationStatus`, payLoad);
  }

  DeleteDeputationStatus(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}DeputationStatus/DeleteDeputationStatus?id=${Id}`);
  }
  GetAllDeputationStatuss(payLoad: string): Observable<DeputationStatus[]> {
    return this.http.get<DeputationStatus[]>(`${environment.backendUrl + environment.hrUrl}DeputationStatus/GetDeputationStatuss?${payLoad}`);
  }

  GetDeputationStatussInfo(payLoad: string): Observable<DeputationStatus[]> {
    return this.http.get<DeputationStatus[]>(`${environment.backendUrl + environment.hrUrl}DeputationStatus/GetDeputationStatussInfo?${payLoad}`);
  }
}