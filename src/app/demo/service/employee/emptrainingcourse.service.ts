import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpTrainingCourse } from '../../models/employee/emptrainingcourse.model';
@Injectable({
  providedIn: 'root'
})
export class EmpTrainingCourseService {

  constructor(private http: HttpClient) { }

  AddEmpTrainingCourse(payLoad: EmpTrainingCourse): Observable<EmpTrainingCourse> {
    return this.http.post<EmpTrainingCourse>(`${environment.backendUrl + environment.hrUrl}EmpTrainingCourse/CreateEmpTrainingCourse`, payLoad);
  }

  UpdateEmpTrainingCourse(payLoad: EmpTrainingCourse): Observable<EmpTrainingCourse> {
    return this.http.put<EmpTrainingCourse>(`${environment.backendUrl + environment.hrUrl}EmpTrainingCourse/UpdateEmpTrainingCourse`, payLoad);
  }

  DeleteEmpTrainingCourse(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}EmpTrainingCourse/DeleteEmpTrainingCourse?id=${Id}`);
  }
  GetAllEmpTrainingCourses(payLoad: string): Observable<EmpTrainingCourse[]> {
    return this.http.get<EmpTrainingCourse[]>(`${environment.backendUrl + environment.hrUrl}EmpTrainingCourse/GetEmpTrainingCourses?${payLoad}`);
  }

  GetEmpTrainingCoursesInfo(payLoad: string): Observable<EmpTrainingCourse[]> {
    return this.http.get<EmpTrainingCourse[]>(`${environment.backendUrl + environment.hrUrl}EmpTrainingCourse/GetEmpTrainingCoursesInfo?${payLoad}`);
  }
}