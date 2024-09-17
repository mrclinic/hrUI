import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { University } from '../../models/constants/university.model';
@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private http: HttpClient) { }

  AddUniversity(payLoad: University): Observable<University> {
    return this.http.post<University>(`${environment.backendUrl + environment.hrUrl}University/CreateUniversity`, payLoad);
  }

  UpdateUniversity(payLoad: University): Observable<University> {
    return this.http.put<University>(`${environment.backendUrl + environment.hrUrl}University/UpdateUniversity`, payLoad);
  }

  DeleteUniversity(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}University/DeleteUniversity?id=${Id}`);
  }
  GetAllUniversitys(payLoad: string): Observable<University[]> {
    return this.http.get<University[]>(`${environment.backendUrl + environment.hrUrl}University/GetUniversitys?${payLoad}`);
  }

  GetUniversitysInfo(payLoad: string): Observable<University[]> {
    return this.http.get<University[]>(`${environment.backendUrl + environment.hrUrl}University/GetUniversitysInfo?${payLoad}`);
  }
}