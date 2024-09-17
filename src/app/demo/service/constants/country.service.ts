import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../../models/constants/country.model';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  AddCountry(payLoad: Country): Observable<Country> {
    return this.http.post<Country>(`${environment.backendUrl + environment.hrUrl}Country/CreateCountry`, payLoad);
  }

  UpdateCountry(payLoad: Country): Observable<Country> {
    return this.http.put<Country>(`${environment.backendUrl + environment.hrUrl}Country/UpdateCountry`, payLoad);
  }

  DeleteCountry(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}Country/DeleteCountry?id=${Id}`);
  }
  GetAllCountrys(payLoad: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.backendUrl + environment.hrUrl}Country/GetCountrys?${payLoad}`);
  }

  GetCountrysInfo(payLoad: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.backendUrl + environment.hrUrl}Country/GetCountrysInfo?${payLoad}`);
  }
}