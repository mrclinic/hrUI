import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Law } from '../../models/constants/law.model';
@Injectable({
  providedIn: 'root'
})
export class LawService {

  constructor(private http: HttpClient) { }

  AddLaw(payLoad: Law): Observable<Law> {
    return this.http.post<Law>(`${environment.backendUrl + environment.hrUrl}Law/CreateLaw`, payLoad);
  }

  UpdateLaw(payLoad: Law): Observable<Law> {
    return this.http.put<Law>(`${environment.backendUrl + environment.hrUrl}Law/UpdateLaw`, payLoad);
  }

  DeleteLaw(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}Law/DeleteLaw?id=${Id}`);
  }
  GetAllLaws(payLoad: string): Observable<Law[]> {
    return this.http.get<Law[]>(`${environment.backendUrl + environment.hrUrl}Law/GetLaws?${payLoad}`);
  }

  GetLawsInfo(payLoad: string): Observable<Law[]> {
    return this.http.get<Law[]>(`${environment.backendUrl + environment.hrUrl}Law/GetLawsInfo?${payLoad}`);
  }
}