import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ForcedVacationType } from '../../models/constants/forcedvacationtype.model';
@Injectable({
  providedIn: 'root'
})
export class ForcedVacationTypeService {

  constructor(private http: HttpClient) { }

  AddForcedVacationType(payLoad: ForcedVacationType): Observable<ForcedVacationType> {
    return this.http.post<ForcedVacationType>(`${environment.backendUrl + environment.hrUrl}ForcedVacationType/CreateForcedVacationType`, payLoad);
  }

  UpdateForcedVacationType(payLoad: ForcedVacationType): Observable<ForcedVacationType> {
    return this.http.put<ForcedVacationType>(`${environment.backendUrl + environment.hrUrl}ForcedVacationType/UpdateForcedVacationType`, payLoad);
  }

  DeleteForcedVacationType(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}ForcedVacationType/DeleteForcedVacationType?id=${Id}`);
  }
  GetAllForcedVacationTypes(payLoad: string): Observable<ForcedVacationType[]> {
    return this.http.get<ForcedVacationType[]>(`${environment.backendUrl + environment.hrUrl}ForcedVacationType/GetForcedVacationTypes?${payLoad}`);
  }

  GetForcedVacationTypesInfo(payLoad: string): Observable<ForcedVacationType[]> {
    return this.http.get<ForcedVacationType[]>(`${environment.backendUrl + environment.hrUrl}ForcedVacationType/GetForcedVacationTypesInfo?${payLoad}`);
  }
}