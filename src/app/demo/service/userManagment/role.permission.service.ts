import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RolePermission } from '../../models/userManagment/RolePermission';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {

  constructor(private http: HttpClient) { }

  AddRolePermission(payLoad: RolePermission): Observable<RolePermission> {
    return this.http.post<RolePermission>(`${environment.backendUrl + environment.userMgtUrl}RolePermissions/CreateRolePermission`, payLoad);
  }

  UpdateRolePermission(payLoad: RolePermission): Observable<RolePermission> {
    return this.http.put<RolePermission>(`${environment.backendUrl + environment.userMgtUrl}RolePermissions/UpdateRolePermission`, payLoad);
  }

  DeleteRolePermission(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.userMgtUrl}RolePermissions/DeleteRolePermission?id=${Id}`);
  }
  GetAllRolePermissions(payLoad: string): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(`${environment.backendUrl + environment.userMgtUrl}RolePermissions/GetRolePermissions?${payLoad}`);
  }

  SetRolePermission(payLoad: RolePermission[], roleId: string): Observable<RolePermission[]> {
    return this.http.post<RolePermission[]>(`${environment.backendUrl + environment.userMgtUrl}RolePermissions/SetRolePermission?roleId=${roleId}`, payLoad);
  }

  GetRolePermissionsInfo(payLoad: string): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(`${environment.backendUrl + environment.userMgtUrl}RolePermissions/GetRolePermissionsInfo?${payLoad}`);
  }
}
