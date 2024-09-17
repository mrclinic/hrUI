import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Specialization } from '../../models/constants/specialization.model';
@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor(private http: HttpClient) { }

  AddSpecialization(payLoad: Specialization): Observable<Specialization> {
    return this.http.post<Specialization>(`${environment.backendUrl + environment.hrUrl}Specialization/CreateSpecialization`, payLoad);
  }

  UpdateSpecialization(payLoad: Specialization): Observable<Specialization> {
    return this.http.put<Specialization>(`${environment.backendUrl + environment.hrUrl}Specialization/UpdateSpecialization`, payLoad);
  }

  DeleteSpecialization(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}Specialization/DeleteSpecialization?id=${Id}`);
  }
  GetAllSpecializations(payLoad: string): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(`${environment.backendUrl + environment.hrUrl}Specialization/GetSpecializations?${payLoad}`);
  }

  GetSpecializationsInfo(payLoad: string): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(`${environment.backendUrl + environment.hrUrl}Specialization/GetSpecializationsInfo?${payLoad}`);
  }
}