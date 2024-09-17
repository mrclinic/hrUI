import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubDepartment } from '../../models/constants/subdepartment.model';
@Injectable({
  providedIn: 'root'
})
export class SubDepartmentService {

  constructor(private http: HttpClient) { }

  AddSubDepartment(payLoad: SubDepartment): Observable<SubDepartment> {
    return this.http.post<SubDepartment>(`${environment.backendUrl + environment.hrUrl}SubDepartment/CreateSubDepartment`, payLoad);
  }

  UpdateSubDepartment(payLoad: SubDepartment): Observable<SubDepartment> {
    return this.http.put<SubDepartment>(`${environment.backendUrl + environment.hrUrl}SubDepartment/UpdateSubDepartment`, payLoad);
  }

  DeleteSubDepartment(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}SubDepartment/DeleteSubDepartment?id=${Id}`);
  }
  GetAllSubDepartments(payLoad: string): Observable<SubDepartment[]> {
    return this.http.get<SubDepartment[]>(`${environment.backendUrl + environment.hrUrl}SubDepartment/GetSubDepartments?${payLoad}`);
  }

  GetSubDepartmentsInfo(payLoad: string): Observable<SubDepartment[]> {
    return this.http.get<SubDepartment[]>(`${environment.backendUrl + environment.hrUrl}SubDepartment/GetSubDepartmentsInfo?${payLoad}`);
  }
}