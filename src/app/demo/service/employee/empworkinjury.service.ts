import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpWorkInjury } from '../../models/employee/empworkinjury.model';
@Injectable({
  providedIn: 'root'
})
export class EmpWorkInjuryService {

  constructor(private http: HttpClient) { }

  AddEmpWorkInjury(payLoad: EmpWorkInjury): Observable<EmpWorkInjury> {
    return this.http.post<EmpWorkInjury>(`${environment.backendUrl + environment.hrUrl}EmpWorkInjury/CreateEmpWorkInjury`, payLoad);
  }

  UpdateEmpWorkInjury(payLoad: EmpWorkInjury): Observable<EmpWorkInjury> {
    return this.http.put<EmpWorkInjury>(`${environment.backendUrl + environment.hrUrl}EmpWorkInjury/UpdateEmpWorkInjury`, payLoad);
  }

  DeleteEmpWorkInjury(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpWorkInjury/DeleteEmpWorkInjury?id=${Id}`);
  }
  GetAllEmpWorkInjurys(payLoad: string): Observable<EmpWorkInjury[]> {
    return this.http.get<EmpWorkInjury[]>(`${environment.backendUrl + environment.hrUrl}EmpWorkInjury/GetEmpWorkInjurys?${payLoad}`);
  }

  GetEmpWorkInjurysInfo(payLoad: string): Observable<EmpWorkInjury[]> {
    return this.http.get<EmpWorkInjury[]>(`${environment.backendUrl + environment.hrUrl}EmpWorkInjury/GetEmpWorkInjurysInfo?${payLoad}`);
  }
}