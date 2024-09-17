import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PunishmentType } from '../../models/constants/punishmenttype.model';
@Injectable({
  providedIn: 'root'
})
export class PunishmentTypeService {

  constructor(private http: HttpClient) { }

  AddPunishmentType(payLoad: PunishmentType): Observable<PunishmentType> {
    return this.http.post<PunishmentType>(`${environment.backendUrl + environment.hrUrl}PunishmentType/CreatePunishmentType`, payLoad);
  }

  UpdatePunishmentType(payLoad: PunishmentType): Observable<PunishmentType> {
    return this.http.put<PunishmentType>(`${environment.backendUrl + environment.hrUrl}PunishmentType/UpdatePunishmentType`, payLoad);
  }

  DeletePunishmentType(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}PunishmentType/DeletePunishmentType?id=${Id}`);
  }
  GetAllPunishmentTypes(payLoad: string): Observable<PunishmentType[]> {
    return this.http.get<PunishmentType[]>(`${environment.backendUrl + environment.hrUrl}PunishmentType/GetPunishmentTypes?${payLoad}`);
  }

  GetPunishmentTypesInfo(payLoad: string): Observable<PunishmentType[]> {
    return this.http.get<PunishmentType[]>(`${environment.backendUrl + environment.hrUrl}PunishmentType/GetPunishmentTypesInfo?${payLoad}`);
  }
}