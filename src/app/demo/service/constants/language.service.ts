import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Language } from '../../models/constants/language.model';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  AddLanguage(payLoad: Language): Observable<Language> {
    return this.http.post<Language>(`${environment.backendUrl + environment.hrUrl}Language/CreateLanguage`, payLoad);
  }

  UpdateLanguage(payLoad: Language): Observable<Language> {
    return this.http.put<Language>(`${environment.backendUrl + environment.hrUrl}Language/UpdateLanguage`, payLoad);
  }

  DeleteLanguage(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}Language/DeleteLanguage?id=${Id}`);
  }
  GetAllLanguages(payLoad: string): Observable<Language[]> {
    return this.http.get<Language[]>(`${environment.backendUrl + environment.hrUrl}Language/GetLanguages?${payLoad}`);
  }

  GetLanguagesInfo(payLoad: string): Observable<Language[]> {
    return this.http.get<Language[]>(`${environment.backendUrl + environment.hrUrl}Language/GetLanguagesInfo?${payLoad}`);
  }
}