import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpMilitaryService } from '../../models/employee/empmilitaryservice.model';
@Injectable({
  providedIn: 'root'
})
export class EmpMilitaryServiceService {

  constructor(private http: HttpClient) { }

  AddEmpMilitaryService(payLoad: EmpMilitaryService): Observable<EmpMilitaryService> {
    return this.http.post<EmpMilitaryService>(`${environment.backendUrl + environment.hrUrl}EmpMilitaryService/CreateEmpMilitaryService`, payLoad);
  }

  UpdateEmpMilitaryService(payLoad: EmpMilitaryService): Observable<EmpMilitaryService> {
    return this.http.put<EmpMilitaryService>(`${environment.backendUrl + environment.hrUrl}EmpMilitaryService/UpdateEmpMilitaryService`, payLoad);
  }

  DeleteEmpMilitaryService(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpMilitaryService/DeleteEmpMilitaryService?id=${Id}`);
  }
  GetAllEmpMilitaryServices(payLoad: string): Observable<EmpMilitaryService[]> {
    return this.http.get<EmpMilitaryService[]>(`${environment.backendUrl + environment.hrUrl}EmpMilitaryService/GetEmpMilitaryServices?${payLoad}`);
  }

  GetEmpMilitaryServicesInfo(payLoad: string): Observable<EmpMilitaryService[]> {
    return this.http.get<EmpMilitaryService[]>(`${environment.backendUrl + environment.hrUrl}EmpMilitaryService/GetEmpMilitaryServicesInfo?${payLoad}`);
  }
}