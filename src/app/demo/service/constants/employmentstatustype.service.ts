import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmploymentStatusType } from '../../models/constants/employmentstatustype.model';
@Injectable({
  providedIn: 'root'
})
export class EmploymentStatusTypeService {

  constructor(private http: HttpClient) { }

  AddEmploymentStatusType(payLoad: EmploymentStatusType): Observable<EmploymentStatusType> {
    return this.http.post<EmploymentStatusType>(`${environment.backendUrl + environment.hrUrl}EmploymentStatusType/CreateEmploymentStatusType`, payLoad);
  }

  UpdateEmploymentStatusType(payLoad: EmploymentStatusType): Observable<EmploymentStatusType> {
    return this.http.put<EmploymentStatusType>(`${environment.backendUrl + environment.hrUrl}EmploymentStatusType/UpdateEmploymentStatusType`, payLoad);
  }

  DeleteEmploymentStatusType(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmploymentStatusType/DeleteEmploymentStatusType?id=${Id}`);
  }
  GetAllEmploymentStatusTypes(payLoad: string): Observable<EmploymentStatusType[]> {
    return this.http.get<EmploymentStatusType[]>(`${environment.backendUrl + environment.hrUrl}EmploymentStatusType/GetEmploymentStatusTypes?${payLoad}`);
  }

  GetEmploymentStatusTypesInfo(payLoad: string): Observable<EmploymentStatusType[]> {
    return this.http.get<EmploymentStatusType[]>(`${environment.backendUrl + environment.hrUrl}EmploymentStatusType/GetEmploymentStatusTypesInfo?${payLoad}`);
  }
}