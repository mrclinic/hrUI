import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpPerformanceEvaluation } from '../../models/employee/empperformanceevaluation.model';
@Injectable({
  providedIn: 'root'
})
export class EmpPerformanceEvaluationService {

  constructor(private http: HttpClient) { }

  AddEmpPerformanceEvaluation(payLoad: EmpPerformanceEvaluation): Observable<EmpPerformanceEvaluation> {
    return this.http.post<EmpPerformanceEvaluation>(`${environment.backendUrl + environment.hrUrl}EmpPerformanceEvaluation/CreateEmpPerformanceEvaluation`, payLoad);
  }

  UpdateEmpPerformanceEvaluation(payLoad: EmpPerformanceEvaluation): Observable<EmpPerformanceEvaluation> {
    return this.http.put<EmpPerformanceEvaluation>(`${environment.backendUrl + environment.hrUrl}EmpPerformanceEvaluation/UpdateEmpPerformanceEvaluation`, payLoad);
  }

  DeleteEmpPerformanceEvaluation(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpPerformanceEvaluation/DeleteEmpPerformanceEvaluation?id=${Id}`);
  }
  GetAllEmpPerformanceEvaluations(payLoad: string): Observable<EmpPerformanceEvaluation[]> {
    return this.http.get<EmpPerformanceEvaluation[]>(`${environment.backendUrl + environment.hrUrl}EmpPerformanceEvaluation/GetEmpPerformanceEvaluations?${payLoad}`);
  }

  GetEmpPerformanceEvaluationsInfo(payLoad: string): Observable<EmpPerformanceEvaluation[]> {
    return this.http.get<EmpPerformanceEvaluation[]>(`${environment.backendUrl + environment.hrUrl}EmpPerformanceEvaluation/GetEmpPerformanceEvaluationsInfo?${payLoad}`);
  }
}