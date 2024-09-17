import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StartingType } from '../../models/constants/startingtype.model';
@Injectable({
  providedIn: 'root'
})
export class StartingTypeService {

  constructor(private http: HttpClient) { }

  AddStartingType(payLoad: StartingType): Observable<StartingType> {
    return this.http.post<StartingType>(`${environment.backendUrl + environment.hrUrl}StartingType/CreateStartingType`, payLoad);
  }

  UpdateStartingType(payLoad: StartingType): Observable<StartingType> {
    return this.http.put<StartingType>(`${environment.backendUrl + environment.hrUrl}StartingType/UpdateStartingType`, payLoad);
  }

  DeleteStartingType(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}StartingType/DeleteStartingType?id=${Id}`);
  }
  GetAllStartingTypes(payLoad: string): Observable<StartingType[]> {
    return this.http.get<StartingType[]>(`${environment.backendUrl + environment.hrUrl}StartingType/GetStartingTypes?${payLoad}`);
  }

  GetStartingTypesInfo(payLoad: string): Observable<StartingType[]> {
    return this.http.get<StartingType[]>(`${environment.backendUrl + environment.hrUrl}StartingType/GetStartingTypesInfo?${payLoad}`);
  }
}