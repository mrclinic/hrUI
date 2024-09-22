import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpAssignment } from '../../models/employee/empassignment.model';
@Injectable({
  providedIn: 'root'
})
export class EmpAssignmentService {

  constructor(private http: HttpClient) { }

  AddEmpAssignment(payLoad: EmpAssignment): Observable<EmpAssignment> {
    return this.http.post<EmpAssignment>(`${environment.backendUrl + environment.hrUrl}EmpAssignment/CreateEmpAssignment`, payLoad);
  }

  UpdateEmpAssignment(payLoad: EmpAssignment): Observable<EmpAssignment> {
    return this.http.put<EmpAssignment>(`${environment.backendUrl + environment.hrUrl}EmpAssignment/UpdateEmpAssignment`, payLoad);
  }

  DeleteEmpAssignment(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpAssignment/DeleteEmpAssignment?id=${Id}`);
  }
  GetAllEmpAssignments(payLoad: string): Observable<EmpAssignment[]> {
    return this.http.get<EmpAssignment[]>(`${environment.backendUrl + environment.hrUrl}EmpAssignment/GetEmpAssignments?${payLoad}`);
  }

  GetEmpAssignmentsInfo(payLoad: string): Observable<EmpAssignment[]> {
    return this.http.get<EmpAssignment[]>(`${environment.backendUrl + environment.hrUrl}EmpAssignment/GetEmpAssignmentsInfo?${payLoad}`);
  }
}