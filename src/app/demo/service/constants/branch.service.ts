import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Branch } from '../../models/constants/branch.model';
@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }

  AddBranch(payLoad: Branch): Observable<Branch> {
    return this.http.post<Branch>(`${environment.backendUrl + environment.hrUrl}Branch/CreateBranch`, payLoad);
  }

  UpdateBranch(payLoad: Branch): Observable<Branch> {
    return this.http.put<Branch>(`${environment.backendUrl + environment.hrUrl}Branch/UpdateBranch`, payLoad);
  }

  DeleteBranch(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}Branch/DeleteBranch?id=${Id}`);
  }
  GetAllBranchs(payLoad: string): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${environment.backendUrl + environment.hrUrl}Branch/GetBranchs?${payLoad}`);
  }

  GetBranchsInfo(payLoad: string): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${environment.backendUrl + environment.hrUrl}Branch/GetBranchsInfo?${payLoad}`);
  }
}