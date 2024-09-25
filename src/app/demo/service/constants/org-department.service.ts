import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrgDepartment } from '../../models/constants/org-department.model';
@Injectable({
  providedIn: 'root'
})
export class OrgDepartmentService {

  constructor(private http: HttpClient) { }

  AddOrgDepartment(payLoad: OrgDepartment): Observable<OrgDepartment> {
    return this.http.post<OrgDepartment>(`${environment.backendUrl + environment.hrUrl}OrgDepartment/CreateOrgDepartment`, payLoad);
  }

  UpdateOrgDepartment(payLoad: OrgDepartment): Observable<OrgDepartment> {
    return this.http.put<OrgDepartment>(`${environment.backendUrl + environment.hrUrl}OrgDepartment/UpdateOrgDepartment`, payLoad);
  }

  DeleteOrgDepartment(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}OrgDepartment/DeleteOrgDepartment?id=${Id}`);
  }
  GetAllOrgDepartments(payLoad: string): Observable<OrgDepartment[]> {
    return this.http.get<OrgDepartment[]>(`${environment.backendUrl + environment.hrUrl}OrgDepartment/GetOrgDepartments?${payLoad}`);
  }

  GetOrgDepartmentsInfo(payLoad: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.backendUrl + environment.hrUrl}OrgDepartment/GetOrgDepartmentsInfo?${payLoad}`);
  }
}