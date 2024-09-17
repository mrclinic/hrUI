import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MilitaryRank } from '../../models/constants/militaryrank.model';
@Injectable({
  providedIn: 'root'
})
export class MilitaryRankService {

  constructor(private http: HttpClient) { }

  AddMilitaryRank(payLoad: MilitaryRank): Observable<MilitaryRank> {
    return this.http.post<MilitaryRank>(`${environment.backendUrl + environment.hrUrl}MilitaryRank/CreateMilitaryRank`, payLoad);
  }

  UpdateMilitaryRank(payLoad: MilitaryRank): Observable<MilitaryRank> {
    return this.http.put<MilitaryRank>(`${environment.backendUrl + environment.hrUrl}MilitaryRank/UpdateMilitaryRank`, payLoad);
  }

  DeleteMilitaryRank(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}MilitaryRank/DeleteMilitaryRank?id=${Id}`);
  }
  GetAllMilitaryRanks(payLoad: string): Observable<MilitaryRank[]> {
    return this.http.get<MilitaryRank[]>(`${environment.backendUrl + environment.hrUrl}MilitaryRank/GetMilitaryRanks?${payLoad}`);
  }

  GetMilitaryRanksInfo(payLoad: string): Observable<MilitaryRank[]> {
    return this.http.get<MilitaryRank[]>(`${environment.backendUrl + environment.hrUrl}MilitaryRank/GetMilitaryRanksInfo?${payLoad}`);
  }
}