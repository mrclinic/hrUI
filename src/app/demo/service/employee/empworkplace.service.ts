import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpWorkPlace } from '../../models/employee/empworkplace.model';
@Injectable({
  providedIn: 'root'
})
export class EmpWorkPlaceService {

  constructor(private http: HttpClient) { }

  AddEmpWorkPlace(payLoad: EmpWorkPlace): Observable<EmpWorkPlace> {
    return this.http.post<EmpWorkPlace>(`${environment.backendUrl + environment.hrUrl}EmpWorkPlace/CreateEmpWorkPlace`, payLoad);
  }

  UpdateEmpWorkPlace(payLoad: EmpWorkPlace): Observable<EmpWorkPlace> {
    return this.http.put<EmpWorkPlace>(`${environment.backendUrl + environment.hrUrl}EmpWorkPlace/UpdateEmpWorkPlace`, payLoad);
  }

  DeleteEmpWorkPlace(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpWorkPlace/DeleteEmpWorkPlace?id=${Id}`);
  }
  GetAllEmpWorkPlaces(payLoad: string): Observable<EmpWorkPlace[]> {
    return this.http.get<EmpWorkPlace[]>(`${environment.backendUrl + environment.hrUrl}EmpWorkPlace/GetEmpWorkPlaces?${payLoad}`);
  }

  GetEmpWorkPlacesInfo(payLoad: string): Observable<EmpWorkPlace[]> {
    return this.http.get<EmpWorkPlace[]>(`${environment.backendUrl + environment.hrUrl}EmpWorkPlace/GetEmpWorkPlacesInfo?${payLoad}`);
  }
}