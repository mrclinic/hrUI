import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeputationType } from '../../models/constants/deputationtype.model';
@Injectable({
  providedIn: 'root'
})
export class DeputationTypeService {

  constructor(private http: HttpClient) { }

  AddDeputationType(payLoad: DeputationType): Observable<DeputationType> {
    return this.http.post<DeputationType>(`${environment.backendUrl + environment.hrUrl}DeputationType/CreateDeputationType`, payLoad);
  }

  UpdateDeputationType(payLoad: DeputationType): Observable<DeputationType> {
    return this.http.put<DeputationType>(`${environment.backendUrl + environment.hrUrl}DeputationType/UpdateDeputationType`, payLoad);
  }

  DeleteDeputationType(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}DeputationType/DeleteDeputationType?id=${Id}`);
  }
  GetAllDeputationTypes(payLoad: string): Observable<DeputationType[]> {
    return this.http.get<DeputationType[]>(`${environment.backendUrl + environment.hrUrl}DeputationType/GetDeputationTypes?${payLoad}`);
  }

  GetDeputationTypesInfo(payLoad: string): Observable<DeputationType[]> {
    return this.http.get<DeputationType[]>(`${environment.backendUrl + environment.hrUrl}DeputationType/GetDeputationTypesInfo?${payLoad}`);
  }
}