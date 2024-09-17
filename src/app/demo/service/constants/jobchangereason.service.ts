import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobChangeReason } from '../../models/constants/jobchangereason.model';
@Injectable({
  providedIn: 'root'
})
export class JobChangeReasonService {

  constructor(private http: HttpClient) { }

  AddJobChangeReason(payLoad: JobChangeReason): Observable<JobChangeReason> {
    return this.http.post<JobChangeReason>(`${environment.backendUrl + environment.hrUrl}JobChangeReason/CreateJobChangeReason`, payLoad);
  }

  UpdateJobChangeReason(payLoad: JobChangeReason): Observable<JobChangeReason> {
    return this.http.put<JobChangeReason>(`${environment.backendUrl + environment.hrUrl}JobChangeReason/UpdateJobChangeReason`, payLoad);
  }

  DeleteJobChangeReason(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}JobChangeReason/DeleteJobChangeReason?id=${Id}`);
  }
  GetAllJobChangeReasons(payLoad: string): Observable<JobChangeReason[]> {
    return this.http.get<JobChangeReason[]>(`${environment.backendUrl + environment.hrUrl}JobChangeReason/GetJobChangeReasons?${payLoad}`);
  }

  GetJobChangeReasonsInfo(payLoad: string): Observable<JobChangeReason[]> {
    return this.http.get<JobChangeReason[]>(`${environment.backendUrl + environment.hrUrl}JobChangeReason/GetJobChangeReasonsInfo?${payLoad}`);
  }
}