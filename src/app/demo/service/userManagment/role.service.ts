import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../../models/userManagment/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  AddRole(payLoad: Role): Observable<Role> {
    return this.http.post<Role>(`${environment.backendUrl + environment.userMgtUrl}Role/CreateRole`, payLoad);
  }

  UpdateRole(payLoad: Role): Observable<Role> {
    return this.http.put<Role>(`${environment.backendUrl + environment.userMgtUrl}Role/UpdateRole`, payLoad);
  }

  DeleteRole(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.userMgtUrl}Role/DeleteRole?id=${Id}`);
  }
  GetAllRoles(payLoad: string): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.backendUrl + environment.userMgtUrl}Role/GetRoles?${payLoad}`);
  }
}
