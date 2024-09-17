import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MaritalStatus } from '../../models/constants/maritalstatus.model';
@Injectable({
  providedIn: 'root'
})
export class MaritalStatusService {

  constructor(private http: HttpClient) { }

  AddMaritalStatus(payLoad: MaritalStatus): Observable<MaritalStatus> {
    return this.http.post<MaritalStatus>(`${environment.backendUrl + environment.hrUrl}MaritalStatus/CreateMaritalStatus`, payLoad);
  }

  UpdateMaritalStatus(payLoad: MaritalStatus): Observable<MaritalStatus> {
    return this.http.put<MaritalStatus>(`${environment.backendUrl + environment.hrUrl}MaritalStatus/UpdateMaritalStatus`, payLoad);
  }

  DeleteMaritalStatus(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}MaritalStatus/DeleteMaritalStatus?id=${Id}`);
  }
  GetAllMaritalStatuss(payLoad: string): Observable<MaritalStatus[]> {
    return this.http.get<MaritalStatus[]>(`${environment.backendUrl + environment.hrUrl}MaritalStatus/GetMaritalStatuss?${payLoad}`);
  }

  GetMaritalStatussInfo(payLoad: string): Observable<MaritalStatus[]> {
    return this.http.get<MaritalStatus[]>(`${environment.backendUrl + environment.hrUrl}MaritalStatus/GetMaritalStatussInfo?${payLoad}`);
  }
}