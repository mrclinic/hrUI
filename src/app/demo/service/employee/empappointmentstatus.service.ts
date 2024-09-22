import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpAppointmentStatus } from '../../models/employee/empappointmentstatus.model';
@Injectable({
  providedIn: 'root'
})
export class EmpAppointmentStatusService {

  constructor(private http: HttpClient) { }

  AddEmpAppointmentStatus(payLoad: EmpAppointmentStatus): Observable<EmpAppointmentStatus> {
    return this.http.post<EmpAppointmentStatus>(`${environment.backendUrl + environment.hrUrl}EmpAppointmentStatus/CreateEmpAppointmentStatus`, payLoad);
  }

  UpdateEmpAppointmentStatus(payLoad: EmpAppointmentStatus): Observable<EmpAppointmentStatus> {
    return this.http.put<EmpAppointmentStatus>(`${environment.backendUrl + environment.hrUrl}EmpAppointmentStatus/UpdateEmpAppointmentStatus`, payLoad);
  }

  DeleteEmpAppointmentStatus(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpAppointmentStatus/DeleteEmpAppointmentStatus?id=${Id}`);
  }
  GetAllEmpAppointmentStatuss(payLoad: string): Observable<EmpAppointmentStatus[]> {
    return this.http.get<EmpAppointmentStatus[]>(`${environment.backendUrl + environment.hrUrl}EmpAppointmentStatus/GetEmpAppointmentStatuss?${payLoad}`);
  }

  GetEmpAppointmentStatussInfo(payLoad: string): Observable<EmpAppointmentStatus[]> {
    return this.http.get<EmpAppointmentStatus[]>(`${environment.backendUrl + environment.hrUrl}EmpAppointmentStatus/GetEmpAppointmentStatussInfo?${payLoad}`);
  }
}