import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OccurrencePartnerType } from '../../models/constants/occurrencepartnertype.model';
@Injectable({
  providedIn: 'root'
})
export class OccurrencePartnerTypeService {

  constructor(private http: HttpClient) { }

  AddOccurrencePartnerType(payLoad: OccurrencePartnerType): Observable<OccurrencePartnerType> {
    return this.http.post<OccurrencePartnerType>(`${environment.backendUrl + environment.hrUrl}OccurrencePartnerType/CreateOccurrencePartnerType`, payLoad);
  }

  UpdateOccurrencePartnerType(payLoad: OccurrencePartnerType): Observable<OccurrencePartnerType> {
    return this.http.put<OccurrencePartnerType>(`${environment.backendUrl + environment.hrUrl}OccurrencePartnerType/UpdateOccurrencePartnerType`, payLoad);
  }

  DeleteOccurrencePartnerType(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}OccurrencePartnerType/DeleteOccurrencePartnerType?id=${Id}`);
  }
  GetAllOccurrencePartnerTypes(payLoad: string): Observable<OccurrencePartnerType[]> {
    return this.http.get<OccurrencePartnerType[]>(`${environment.backendUrl + environment.hrUrl}OccurrencePartnerType/GetOccurrencePartnerTypes?${payLoad}`);
  }

  GetOccurrencePartnerTypesInfo(payLoad: string): Observable<OccurrencePartnerType[]> {
    return this.http.get<OccurrencePartnerType[]>(`${environment.backendUrl + environment.hrUrl}OccurrencePartnerType/GetOccurrencePartnerTypesInfo?${payLoad}`);
  }
}