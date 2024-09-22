import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpDeputation } from '../../models/employee/empdeputation.model';
@Injectable({
  providedIn: 'root'
})
export class EmpDeputationService {

  constructor(private http: HttpClient) { }

  AddEmpDeputation(payLoad: EmpDeputation): Observable<EmpDeputation> {
    return this.http.post<EmpDeputation>(`${environment.backendUrl + environment.hrUrl}EmpDeputation/CreateEmpDeputation`, payLoad);
  }

  UpdateEmpDeputation(payLoad: EmpDeputation): Observable<EmpDeputation> {
    return this.http.put<EmpDeputation>(`${environment.backendUrl + environment.hrUrl}EmpDeputation/UpdateEmpDeputation`, payLoad);
  }

  DeleteEmpDeputation(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpDeputation/DeleteEmpDeputation?id=${Id}`);
  }
  GetAllEmpDeputations(payLoad: string): Observable<EmpDeputation[]> {
    return this.http.get<EmpDeputation[]>(`${environment.backendUrl + environment.hrUrl}EmpDeputation/GetEmpDeputations?${payLoad}`);
  }

  GetEmpDeputationsInfo(payLoad: string): Observable<EmpDeputation[]> {
    return this.http.get<EmpDeputation[]>(`${environment.backendUrl + environment.hrUrl}EmpDeputation/GetEmpDeputationsInfo?${payLoad}`);
  }
}