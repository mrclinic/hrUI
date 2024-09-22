import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpEmploymentStatus } from '../../models/employee/empemploymentstatus.model';
@Injectable({
  providedIn: 'root'
})
export class EmpEmploymentStatusService {

  constructor(private http: HttpClient) { }

  AddEmpEmploymentStatus(payLoad: EmpEmploymentStatus): Observable<EmpEmploymentStatus> {
    return this.http.post<EmpEmploymentStatus>(`${environment.backendUrl + environment.hrUrl}EmpEmploymentStatus/CreateEmpEmploymentStatus`, payLoad);
  }

  UpdateEmpEmploymentStatus(payLoad: EmpEmploymentStatus): Observable<EmpEmploymentStatus> {
    return this.http.put<EmpEmploymentStatus>(`${environment.backendUrl + environment.hrUrl}EmpEmploymentStatus/UpdateEmpEmploymentStatus`, payLoad);
  }

  DeleteEmpEmploymentStatus(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpEmploymentStatus/DeleteEmpEmploymentStatus?id=${Id}`);
  }
  GetAllEmpEmploymentStatuss(payLoad: string): Observable<EmpEmploymentStatus[]> {
    return this.http.get<EmpEmploymentStatus[]>(`${environment.backendUrl + environment.hrUrl}EmpEmploymentStatus/GetEmpEmploymentStatuss?${payLoad}`);
  }

  GetEmpEmploymentStatussInfo(payLoad: string): Observable<EmpEmploymentStatus[]> {
    return this.http.get<EmpEmploymentStatus[]>(`${environment.backendUrl + environment.hrUrl}EmpEmploymentStatus/GetEmpEmploymentStatussInfo?${payLoad}`);
  }
}