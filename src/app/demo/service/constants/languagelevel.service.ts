import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LanguageLevel } from '../../models/constants/languagelevel.model';
@Injectable({
  providedIn: 'root'
})
export class LanguageLevelService {

  constructor(private http: HttpClient) { }

  AddLanguageLevel(payLoad: LanguageLevel): Observable<LanguageLevel> {
    return this.http.post<LanguageLevel>(`${environment.backendUrl + environment.hrUrl}LanguageLevel/CreateLanguageLevel`, payLoad);
  }

  UpdateLanguageLevel(payLoad: LanguageLevel): Observable<LanguageLevel> {
    return this.http.put<LanguageLevel>(`${environment.backendUrl + environment.hrUrl}LanguageLevel/UpdateLanguageLevel`, payLoad);
  }

  DeleteLanguageLevel(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}LanguageLevel/DeleteLanguageLevel?id=${Id}`);
  }
  GetAllLanguageLevels(payLoad: string): Observable<LanguageLevel[]> {
    return this.http.get<LanguageLevel[]>(`${environment.backendUrl + environment.hrUrl}LanguageLevel/GetLanguageLevels?${payLoad}`);
  }

  GetLanguageLevelsInfo(payLoad: string): Observable<LanguageLevel[]> {
    return this.http.get<LanguageLevel[]>(`${environment.backendUrl + environment.hrUrl}LanguageLevel/GetLanguageLevelsInfo?${payLoad}`);
  }
}