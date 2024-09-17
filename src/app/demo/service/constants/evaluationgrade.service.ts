import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EvaluationGrade } from '../../models/constants/evaluationgrade.model';
@Injectable({
  providedIn: 'root'
})
export class EvaluationGradeService {

  constructor(private http: HttpClient) { }

  AddEvaluationGrade(payLoad: EvaluationGrade): Observable<EvaluationGrade> {
    return this.http.post<EvaluationGrade>(`${environment.backendUrl + environment.hrUrl}EvaluationGrade/CreateEvaluationGrade`, payLoad);
  }

  UpdateEvaluationGrade(payLoad: EvaluationGrade): Observable<EvaluationGrade> {
    return this.http.put<EvaluationGrade>(`${environment.backendUrl + environment.hrUrl}EvaluationGrade/UpdateEvaluationGrade`, payLoad);
  }

  DeleteEvaluationGrade(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EvaluationGrade/DeleteEvaluationGrade?id=${Id}`);
  }
  GetAllEvaluationGrades(payLoad: string): Observable<EvaluationGrade[]> {
    return this.http.get<EvaluationGrade[]>(`${environment.backendUrl + environment.hrUrl}EvaluationGrade/GetEvaluationGrades?${payLoad}`);
  }

  GetEvaluationGradesInfo(payLoad: string): Observable<EvaluationGrade[]> {
    return this.http.get<EvaluationGrade[]>(`${environment.backendUrl + environment.hrUrl}EvaluationGrade/GetEvaluationGradesInfo?${payLoad}`);
  }
}