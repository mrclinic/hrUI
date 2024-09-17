import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DisabilityType } from '../../models/constants/disabilitytype.model';
@Injectable({
  providedIn: 'root'
})
export class DisabilityTypeService {

  constructor(private http: HttpClient) { }

  AddDisabilityType(payLoad: DisabilityType): Observable<DisabilityType> {
    return this.http.post<DisabilityType>(`${environment.backendUrl + environment.hrUrl}DisabilityType/CreateDisabilityType`, payLoad);
  }

  UpdateDisabilityType(payLoad: DisabilityType): Observable<DisabilityType> {
    return this.http.put<DisabilityType>(`${environment.backendUrl + environment.hrUrl}DisabilityType/UpdateDisabilityType`, payLoad);
  }

  DeleteDisabilityType(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}DisabilityType/DeleteDisabilityType?id=${Id}`);
  }
  GetAllDisabilityTypes(payLoad: string): Observable<DisabilityType[]> {
    return this.http.get<DisabilityType[]>(`${environment.backendUrl + environment.hrUrl}DisabilityType/GetDisabilityTypes?${payLoad}`);
  }

  GetDisabilityTypesInfo(payLoad: string): Observable<DisabilityType[]> {
    return this.http.get<DisabilityType[]>(`${environment.backendUrl + environment.hrUrl}DisabilityType/GetDisabilityTypesInfo?${payLoad}`);
  }
}