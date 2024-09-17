import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RelinquishmentReason } from '../../models/constants/relinquishmentreason.model';
@Injectable({
  providedIn: 'root'
})
export class RelinquishmentReasonService {

  constructor(private http: HttpClient) { }

  AddRelinquishmentReason(payLoad: RelinquishmentReason): Observable<RelinquishmentReason> {
    return this.http.post<RelinquishmentReason>(`${environment.backendUrl + environment.hrUrl}RelinquishmentReason/CreateRelinquishmentReason`, payLoad);
  }

  UpdateRelinquishmentReason(payLoad: RelinquishmentReason): Observable<RelinquishmentReason> {
    return this.http.put<RelinquishmentReason>(`${environment.backendUrl + environment.hrUrl}RelinquishmentReason/UpdateRelinquishmentReason`, payLoad);
  }

  DeleteRelinquishmentReason(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}RelinquishmentReason/DeleteRelinquishmentReason?id=${Id}`);
  }
  GetAllRelinquishmentReasons(payLoad: string): Observable<RelinquishmentReason[]> {
    return this.http.get<RelinquishmentReason[]>(`${environment.backendUrl + environment.hrUrl}RelinquishmentReason/GetRelinquishmentReasons?${payLoad}`);
  }

  GetRelinquishmentReasonsInfo(payLoad: string): Observable<RelinquishmentReason[]> {
    return this.http.get<RelinquishmentReason[]>(`${environment.backendUrl + environment.hrUrl}RelinquishmentReason/GetRelinquishmentReasonsInfo?${payLoad}`);
  }
}