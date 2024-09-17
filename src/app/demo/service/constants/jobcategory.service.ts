import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobCategory } from '../../models/constants/jobcategory.model';
@Injectable({
  providedIn: 'root'
})
export class JobCategoryService {

  constructor(private http: HttpClient) { }

  AddJobCategory(payLoad: JobCategory): Observable<JobCategory> {
    return this.http.post<JobCategory>(`${environment.backendUrl + environment.hrUrl}JobCategory/CreateJobCategory`, payLoad);
  }

  UpdateJobCategory(payLoad: JobCategory): Observable<JobCategory> {
    return this.http.put<JobCategory>(`${environment.backendUrl + environment.hrUrl}JobCategory/UpdateJobCategory`, payLoad);
  }

  DeleteJobCategory(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}JobCategory/DeleteJobCategory?id=${Id}`);
  }
  GetAllJobCategorys(payLoad: string): Observable<JobCategory[]> {
    return this.http.get<JobCategory[]>(`${environment.backendUrl + environment.hrUrl}JobCategory/GetJobCategorys?${payLoad}`);
  }

  GetJobCategorysInfo(payLoad: string): Observable<JobCategory[]> {
    return this.http.get<JobCategory[]>(`${environment.backendUrl + environment.hrUrl}JobCategory/GetJobCategorysInfo?${payLoad}`);
  }
}