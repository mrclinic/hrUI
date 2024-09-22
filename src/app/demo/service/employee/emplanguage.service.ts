import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpLanguage } from '../../models/employee/emplanguage.model';
@Injectable({
  providedIn: 'root'
})
export class EmpLanguageService {

  constructor(private http: HttpClient) { }

  AddEmpLanguage(payLoad: EmpLanguage): Observable<EmpLanguage> {
    return this.http.post<EmpLanguage>(`${environment.backendUrl + environment.hrUrl}EmpLanguage/CreateEmpLanguage`, payLoad);
  }

  UpdateEmpLanguage(payLoad: EmpLanguage): Observable<EmpLanguage> {
    return this.http.put<EmpLanguage>(`${environment.backendUrl + environment.hrUrl}EmpLanguage/UpdateEmpLanguage`, payLoad);
  }

  DeleteEmpLanguage(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpLanguage/DeleteEmpLanguage?id=${Id}`);
  }
  GetAllEmpLanguages(payLoad: string): Observable<EmpLanguage[]> {
    return this.http.get<EmpLanguage[]>(`${environment.backendUrl + environment.hrUrl}EmpLanguage/GetEmpLanguages?${payLoad}`);
  }

  GetEmpLanguagesInfo(payLoad: string): Observable<EmpLanguage[]> {
    return this.http.get<EmpLanguage[]>(`${environment.backendUrl + environment.hrUrl}EmpLanguage/GetEmpLanguagesInfo?${payLoad}`);
  }
}