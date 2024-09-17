import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Permission } from '../../models/userManagment/Permission';
import { GeneralResult } from '../../models/GeneralResul';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  AddPermission(payLoad: Permission): Observable<Permission> {
    return this.http.post<Permission>(`${environment.backendUrl + environment.userMgtUrl}Permission/CreatePermission`, payLoad);
  }

  UpdatePermission(payLoad: Permission): Observable<Permission> {
    return this.http.put<Permission>(`${environment.backendUrl + environment.userMgtUrl}Permission/UpdatePermission`, payLoad);
  }

  DeletePermission(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.userMgtUrl}Permission/DeletePermission?id=${Id}`);
  }
  GetAllPermissions1(payLoad: string): Observable<GeneralResult> {
    return this.http.get<GeneralResult>(`${environment.backendUrl + environment.userMgtUrl}Permission/GetPermissions?${payLoad}`);
  }
  GetAllPermissions(payLoad: string): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${environment.backendUrl + environment.userMgtUrl}Permission/GetPermissions?${payLoad}`);
  }
}
