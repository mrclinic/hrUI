import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeputationObjective } from '../../models/constants/deputationobjective.model';
@Injectable({
  providedIn: 'root'
})
export class DeputationObjectiveService {

  constructor(private http: HttpClient) { }

  AddDeputationObjective(payLoad: DeputationObjective): Observable<DeputationObjective> {
    return this.http.post<DeputationObjective>(`${environment.backendUrl + environment.hrUrl}DeputationObjective/CreateDeputationObjective`, payLoad);
  }

  UpdateDeputationObjective(payLoad: DeputationObjective): Observable<DeputationObjective> {
    return this.http.put<DeputationObjective>(`${environment.backendUrl + environment.hrUrl}DeputationObjective/UpdateDeputationObjective`, payLoad);
  }

  DeleteDeputationObjective(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}DeputationObjective/DeleteDeputationObjective?id=${Id}`);
  }
  GetAllDeputationObjectives(payLoad: string): Observable<DeputationObjective[]> {
    return this.http.get<DeputationObjective[]>(`${environment.backendUrl + environment.hrUrl}DeputationObjective/GetDeputationObjectives?${payLoad}`);
  }

  GetDeputationObjectivesInfo(payLoad: string): Observable<DeputationObjective[]> {
    return this.http.get<DeputationObjective[]>(`${environment.backendUrl + environment.hrUrl}DeputationObjective/GetDeputationObjectivesInfo?${payLoad}`);
  }
}