import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChildStatus } from '../../models/constants/childstatus.model';
@Injectable({
  providedIn: 'root'
})
export class ChildStatusService {

  constructor(private http: HttpClient) { }

  AddChildStatus(payLoad: ChildStatus): Observable<ChildStatus> {
    return this.http.post<ChildStatus>(`${environment.backendUrl + environment.hrUrl}ChildStatus/CreateChildStatus`, payLoad);
  }

  UpdateChildStatus(payLoad: ChildStatus): Observable<ChildStatus> {
    return this.http.put<ChildStatus>(`${environment.backendUrl + environment.hrUrl}ChildStatus/UpdateChildStatus`, payLoad);
  }

  DeleteChildStatus(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}ChildStatus/DeleteChildStatus?id=${Id}`);
  }
  GetAllChildStatuss(payLoad: string): Observable<ChildStatus[]> {
    return this.http.get<ChildStatus[]>(`${environment.backendUrl + environment.hrUrl}ChildStatus/GetChildStatuss?${payLoad}`);
  }

  GetChildStatussInfo(payLoad: string): Observable<ChildStatus[]> {
    return this.http.get<ChildStatus[]>(`${environment.backendUrl + environment.hrUrl}ChildStatus/GetChildStatussInfo?${payLoad}`);
  }
}