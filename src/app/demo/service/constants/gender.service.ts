import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gender } from '../../models/constants/gender.model';
@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private http: HttpClient) { }

  AddGender(payLoad: Gender): Observable<Gender> {
    return this.http.post<Gender>(`${environment.backendUrl + environment.hrUrl}Gender/CreateGender`, payLoad);
  }

  UpdateGender(payLoad: Gender): Observable<Gender> {
    return this.http.put<Gender>(`${environment.backendUrl + environment.hrUrl}Gender/UpdateGender`, payLoad);
  }

  DeleteGender(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}Gender/DeleteGender?id=${Id}`);
  }
  GetAllGenders(payLoad: string): Observable<Gender[]> {
    return this.http.get<Gender[]>(`${environment.backendUrl + environment.hrUrl}Gender/GetGenders?${payLoad}`);
  }

  GetGendersInfo(payLoad: string): Observable<Gender[]> {
    return this.http.get<Gender[]>(`${environment.backendUrl + environment.hrUrl}Gender/GetGendersInfo?${payLoad}`);
  }
}