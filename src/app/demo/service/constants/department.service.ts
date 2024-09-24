import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../../models/constants/department.model';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  AddDepartment(payLoad: Department): Observable<Department> {
    return this.http.post<Department>(`${environment.backendUrl + environment.hrUrl}Department/CreateDepartment`, payLoad);
  }

  UpdateDepartment(payLoad: Department): Observable<Department> {
    return this.http.put<Department>(`${environment.backendUrl + environment.hrUrl}Department/UpdateDepartment`, payLoad);
  }

  DeleteDepartment(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}Department/DeleteDepartment?id=${Id}`);
  }
  GetAllDepartments(payLoad: string): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.backendUrl + environment.hrUrl}Department/GetDepartments?${payLoad}`);
  }

  GetDepartmentsInfo(payLoad: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.backendUrl + environment.hrUrl}Department/GetDepartmentsInfo?${payLoad}`);
  }
}