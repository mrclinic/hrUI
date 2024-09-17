import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../../models/constants/city.model';
@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  AddCity(payLoad: City): Observable<City> {
    return this.http.post<City>(`${environment.backendUrl + environment.hrUrl}City/CreateCity`, payLoad);
  }

  UpdateCity(payLoad: City): Observable<City> {
    return this.http.put<City>(`${environment.backendUrl + environment.hrUrl}City/UpdateCity`, payLoad);
  }

  DeleteCity(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}City/DeleteCity?id=${Id}`);
  }
  GetAllCitys(payLoad: string): Observable<City[]> {
    return this.http.get<City[]>(`${environment.backendUrl + environment.hrUrl}City/GetCitys?${payLoad}`);
  }

  GetCitysInfo(payLoad: string): Observable<City[]> {
    return this.http.get<City[]>(`${environment.backendUrl + environment.hrUrl}City/GetCitysInfo?${payLoad}`);
  }
}