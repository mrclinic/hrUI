import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TerminationReason } from '../../models/constants/terminationreason.model';
@Injectable({
  providedIn: 'root'
})
export class TerminationReasonService {

  constructor(private http: HttpClient) { }

  AddTerminationReason(payLoad: TerminationReason): Observable<TerminationReason> {
    return this.http.post<TerminationReason>(`${environment.backendUrl + environment.hrUrl}TerminationReason/CreateTerminationReason`, payLoad);
  }

  UpdateTerminationReason(payLoad: TerminationReason): Observable<TerminationReason> {
    return this.http.put<TerminationReason>(`${environment.backendUrl + environment.hrUrl}TerminationReason/UpdateTerminationReason`, payLoad);
  }

  DeleteTerminationReason(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}TerminationReason/DeleteTerminationReason?id=${Id}`);
  }
  GetAllTerminationReasons(payLoad: string): Observable<TerminationReason[]> {
    return this.http.get<TerminationReason[]>(`${environment.backendUrl + environment.hrUrl}TerminationReason/GetTerminationReasons?${payLoad}`);
  }

  GetTerminationReasonsInfo(payLoad: string): Observable<TerminationReason[]> {
    return this.http.get<TerminationReason[]>(`${environment.backendUrl + environment.hrUrl}TerminationReason/GetTerminationReasonsInfo?${payLoad}`);
  }
}