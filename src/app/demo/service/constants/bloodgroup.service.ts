import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BloodGroup } from '../../models/constants/bloodgroup.model';
@Injectable({
  providedIn: 'root'
})
export class BloodGroupService {

  constructor(private http: HttpClient) { }

  AddBloodGroup(payLoad: BloodGroup): Observable<BloodGroup> {
    return this.http.post<BloodGroup>(`${environment.backendUrl + environment.hrUrl}BloodGroup/CreateBloodGroup`, payLoad);
  }

  UpdateBloodGroup(payLoad: BloodGroup): Observable<BloodGroup> {
    return this.http.put<BloodGroup>(`${environment.backendUrl + environment.hrUrl}BloodGroup/UpdateBloodGroup`, payLoad);
  }

  DeleteBloodGroup(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}BloodGroup/DeleteBloodGroup?id=${Id}`);
  }
  GetAllBloodGroups(payLoad: string): Observable<BloodGroup[]> {
    return this.http.get<BloodGroup[]>(`${environment.backendUrl + environment.hrUrl}BloodGroup/GetBloodGroups?${payLoad}`);
  }

  GetBloodGroupsInfo(payLoad: string): Observable<BloodGroup[]> {
    return this.http.get<BloodGroup[]>(`${environment.backendUrl + environment.hrUrl}BloodGroup/GetBloodGroupsInfo?${payLoad}`);
  }
}