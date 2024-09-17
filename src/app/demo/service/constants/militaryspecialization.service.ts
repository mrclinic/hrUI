import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MilitarySpecialization } from '../../models/constants/militaryspecialization.model';
@Injectable({
  providedIn: 'root'
})
export class MilitarySpecializationService {

  constructor(private http: HttpClient) { }

  AddMilitarySpecialization(payLoad: MilitarySpecialization): Observable<MilitarySpecialization> {
    return this.http.post<MilitarySpecialization>(`${environment.backendUrl + environment.hrUrl}MilitarySpecialization/CreateMilitarySpecialization`, payLoad);
  }

  UpdateMilitarySpecialization(payLoad: MilitarySpecialization): Observable<MilitarySpecialization> {
    return this.http.put<MilitarySpecialization>(`${environment.backendUrl + environment.hrUrl}MilitarySpecialization/UpdateMilitarySpecialization`, payLoad);
  }

  DeleteMilitarySpecialization(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}MilitarySpecialization/DeleteMilitarySpecialization?id=${Id}`);
  }
  GetAllMilitarySpecializations(payLoad: string): Observable<MilitarySpecialization[]> {
    return this.http.get<MilitarySpecialization[]>(`${environment.backendUrl + environment.hrUrl}MilitarySpecialization/GetMilitarySpecializations?${payLoad}`);
  }

  GetMilitarySpecializationsInfo(payLoad: string): Observable<MilitarySpecialization[]> {
    return this.http.get<MilitarySpecialization[]>(`${environment.backendUrl + environment.hrUrl}MilitarySpecialization/GetMilitarySpecializationsInfo?${payLoad}`);
  }
}