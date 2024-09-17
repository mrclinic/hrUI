import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Qualification } from '../../models/constants/qualification.model';
@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  constructor(private http: HttpClient) { }

  AddQualification(payLoad: Qualification): Observable<Qualification> {
    return this.http.post<Qualification>(`${environment.backendUrl + environment.hrUrl}Qualification/CreateQualification`, payLoad);
  }

  UpdateQualification(payLoad: Qualification): Observable<Qualification> {
    return this.http.put<Qualification>(`${environment.backendUrl + environment.hrUrl}Qualification/UpdateQualification`, payLoad);
  }

  DeleteQualification(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}Qualification/DeleteQualification?id=${Id}`);
  }
  GetAllQualifications(payLoad: string): Observable<Qualification[]> {
    return this.http.get<Qualification[]>(`${environment.backendUrl + environment.hrUrl}Qualification/GetQualifications?${payLoad}`);
  }

  GetQualificationsInfo(payLoad: string): Observable<Qualification[]> {
    return this.http.get<Qualification[]>(`${environment.backendUrl + environment.hrUrl}Qualification/GetQualificationsInfo?${payLoad}`);
  }
}