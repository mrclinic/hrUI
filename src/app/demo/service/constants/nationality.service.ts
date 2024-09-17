import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nationality } from '../../models/constants/nationality.model';
@Injectable({
  providedIn: 'root'
})
export class NationalityService {

  constructor(private http: HttpClient) { }

  AddNationality(payLoad: Nationality): Observable<Nationality> {
    return this.http.post<Nationality>(`${environment.backendUrl + environment.hrUrl}Nationality/CreateNationality`, payLoad);
  }

  UpdateNationality(payLoad: Nationality): Observable<Nationality> {
    return this.http.put<Nationality>(`${environment.backendUrl + environment.hrUrl}Nationality/UpdateNationality`, payLoad);
  }

  DeleteNationality(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}Nationality/DeleteNationality?id=${Id}`);
  }
  GetAllNationalitys(payLoad: string): Observable<Nationality[]> {
    return this.http.get<Nationality[]>(`${environment.backendUrl + environment.hrUrl}Nationality/GetNationalitys?${payLoad}`);
  }

  GetNationalitysInfo(payLoad: string): Observable<Nationality[]> {
    return this.http.get<Nationality[]>(`${environment.backendUrl + environment.hrUrl}Nationality/GetNationalitysInfo?${payLoad}`);
  }
}