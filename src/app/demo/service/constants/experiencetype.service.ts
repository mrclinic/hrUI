import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExperienceType } from '../../models/constants/experiencetype.model';
@Injectable({
  providedIn: 'root'
})
export class ExperienceTypeService {

  constructor(private http: HttpClient) { }

  AddExperienceType(payLoad: ExperienceType): Observable<ExperienceType> {
    return this.http.post<ExperienceType>(`${environment.backendUrl + environment.hrUrl}ExperienceType/CreateExperienceType`, payLoad);
  }

  UpdateExperienceType(payLoad: ExperienceType): Observable<ExperienceType> {
    return this.http.put<ExperienceType>(`${environment.backendUrl + environment.hrUrl}ExperienceType/UpdateExperienceType`, payLoad);
  }

  DeleteExperienceType(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}ExperienceType/DeleteExperienceType?id=${Id}`);
  }
  GetAllExperienceTypes(payLoad: string): Observable<ExperienceType[]> {
    return this.http.get<ExperienceType[]>(`${environment.backendUrl + environment.hrUrl}ExperienceType/GetExperienceTypes?${payLoad}`);
  }

  GetExperienceTypesInfo(payLoad: string): Observable<ExperienceType[]> {
    return this.http.get<ExperienceType[]>(`${environment.backendUrl + environment.hrUrl}ExperienceType/GetExperienceTypesInfo?${payLoad}`);
  }
}