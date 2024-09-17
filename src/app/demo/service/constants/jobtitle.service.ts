import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobTitle } from '../../models/constants/jobtitle.model';
@Injectable({
  providedIn: 'root'
})
export class JobTitleService {

  constructor(private http: HttpClient) { }

  AddJobTitle(payLoad: JobTitle): Observable<JobTitle> {
    return this.http.post<JobTitle>(`${environment.backendUrl + environment.hrUrl}JobTitle/CreateJobTitle`, payLoad);
  }

  UpdateJobTitle(payLoad: JobTitle): Observable<JobTitle> {
    return this.http.put<JobTitle>(`${environment.backendUrl + environment.hrUrl}JobTitle/UpdateJobTitle`, payLoad);
  }

  DeleteJobTitle(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}JobTitle/DeleteJobTitle?id=${Id}`);
  }
  GetAllJobTitles(payLoad: string): Observable<JobTitle[]> {
    return this.http.get<JobTitle[]>(`${environment.backendUrl + environment.hrUrl}JobTitle/GetJobTitles?${payLoad}`);
  }

  GetJobTitlesInfo(payLoad: string): Observable<JobTitle[]> {
    return this.http.get<JobTitle[]>(`${environment.backendUrl + environment.hrUrl}JobTitle/GetJobTitlesInfo?${payLoad}`);
  }
}