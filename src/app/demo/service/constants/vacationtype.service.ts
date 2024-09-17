import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VacationType } from '../../models/constants/vacationtype.model';
@Injectable({
  providedIn: 'root'
})
export class VacationTypeService {

  constructor(private http: HttpClient) { }

  AddVacationType(payLoad: VacationType): Observable<VacationType> {
    return this.http.post<VacationType>(`${environment.backendUrl + environment.hrUrl}VacationType/CreateVacationType`, payLoad);
  }

  UpdateVacationType(payLoad: VacationType): Observable<VacationType> {
    return this.http.put<VacationType>(`${environment.backendUrl + environment.hrUrl}VacationType/UpdateVacationType`, payLoad);
  }

  DeleteVacationType(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}VacationType/DeleteVacationType?id=${Id}`);
  }
  GetAllVacationTypes(payLoad: string): Observable<VacationType[]> {
    return this.http.get<VacationType[]>(`${environment.backendUrl + environment.hrUrl}VacationType/GetVacationTypes?${payLoad}`);
  }

  GetVacationTypesInfo(payLoad: string): Observable<VacationType[]> {
    return this.http.get<VacationType[]>(`${environment.backendUrl + environment.hrUrl}VacationType/GetVacationTypesInfo?${payLoad}`);
  }
}