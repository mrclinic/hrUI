import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModificationContractType } from '../../models/constants/modificationcontracttype.model';
@Injectable({
  providedIn: 'root'
})
export class ModificationContractTypeService {

  constructor(private http: HttpClient) { }

  AddModificationContractType(payLoad: ModificationContractType): Observable<ModificationContractType> {
    return this.http.post<ModificationContractType>(`${environment.backendUrl + environment.hrUrl}ModificationContractType/CreateModificationContractType`, payLoad);
  }

  UpdateModificationContractType(payLoad: ModificationContractType): Observable<ModificationContractType> {
    return this.http.put<ModificationContractType>(`${environment.backendUrl + environment.hrUrl}ModificationContractType/UpdateModificationContractType`, payLoad);
  }

  DeleteModificationContractType(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}ModificationContractType/DeleteModificationContractType?id=${Id}`);
  }
  GetAllModificationContractTypes(payLoad: string): Observable<ModificationContractType[]> {
    return this.http.get<ModificationContractType[]>(`${environment.backendUrl + environment.hrUrl}ModificationContractType/GetModificationContractTypes?${payLoad}`);
  }

  GetModificationContractTypesInfo(payLoad: string): Observable<ModificationContractType[]> {
    return this.http.get<ModificationContractType[]>(`${environment.backendUrl + environment.hrUrl}ModificationContractType/GetModificationContractTypesInfo?${payLoad}`);
  }
}