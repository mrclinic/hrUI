import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DegreesAuthority } from '../../models/constants/degreesauthority.model';
@Injectable({
  providedIn: 'root'
})
export class DegreesAuthorityService {

  constructor(private http: HttpClient) { }

  AddDegreesAuthority(payLoad: DegreesAuthority): Observable<DegreesAuthority> {
    return this.http.post<DegreesAuthority>(`${environment.backendUrl + environment.hrUrl}DegreesAuthority/CreateDegreesAuthority`, payLoad);
  }

  UpdateDegreesAuthority(payLoad: DegreesAuthority): Observable<DegreesAuthority> {
    return this.http.put<DegreesAuthority>(`${environment.backendUrl + environment.hrUrl}DegreesAuthority/UpdateDegreesAuthority`, payLoad);
  }

  DeleteDegreesAuthority(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}DegreesAuthority/DeleteDegreesAuthority?id=${Id}`);
  }
  GetAllDegreesAuthoritys(payLoad: string): Observable<DegreesAuthority[]> {
    return this.http.get<DegreesAuthority[]>(`${environment.backendUrl + environment.hrUrl}DegreesAuthority/GetDegreesAuthoritys?${payLoad}`);
  }

  GetDegreesAuthoritysInfo(payLoad: string): Observable<DegreesAuthority[]> {
    return this.http.get<DegreesAuthority[]>(`${environment.backendUrl + environment.hrUrl}DegreesAuthority/GetDegreesAuthoritysInfo?${payLoad}`);
  }
}