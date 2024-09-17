import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EvaluationQuarter } from '../../models/constants/evaluationquarter.model';
@Injectable({
  providedIn: 'root'
})
export class EvaluationQuarterService {

  constructor(private http: HttpClient) { }

  AddEvaluationQuarter(payLoad: EvaluationQuarter): Observable<EvaluationQuarter> {
    return this.http.post<EvaluationQuarter>(`${environment.backendUrl + environment.hrUrl}EvaluationQuarter/CreateEvaluationQuarter`, payLoad);
  }

  UpdateEvaluationQuarter(payLoad: EvaluationQuarter): Observable<EvaluationQuarter> {
    return this.http.put<EvaluationQuarter>(`${environment.backendUrl + environment.hrUrl}EvaluationQuarter/UpdateEvaluationQuarter`, payLoad);
  }

  DeleteEvaluationQuarter(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EvaluationQuarter/DeleteEvaluationQuarter?id=${Id}`);
  }
  GetAllEvaluationQuarters(payLoad: string): Observable<EvaluationQuarter[]> {
    return this.http.get<EvaluationQuarter[]>(`${environment.backendUrl + environment.hrUrl}EvaluationQuarter/GetEvaluationQuarters?${payLoad}`);
  }

  GetEvaluationQuartersInfo(payLoad: string): Observable<EvaluationQuarter[]> {
    return this.http.get<EvaluationQuarter[]>(`${environment.backendUrl + environment.hrUrl}EvaluationQuarter/GetEvaluationQuartersInfo?${payLoad}`);
  }
}