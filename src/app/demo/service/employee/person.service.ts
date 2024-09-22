import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../../models/employee/person.model';
@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  AddPerson(payLoad: Person): Observable<Person> {
    return this.http.post<Person>(`${environment.backendUrl + environment.hrUrl}Person/CreatePerson`, payLoad);
  }

  UpdatePerson(payLoad: Person): Observable<Person> {
    return this.http.put<Person>(`${environment.backendUrl + environment.hrUrl}Person/UpdatePerson`, payLoad);
  }

  DeletePerson(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.hrUrl}Person/DeletePerson?id=${Id}`);
  }
  GetAllPersons(payLoad: string): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.backendUrl + environment.hrUrl}Person/GetPersons?${payLoad}`);
  }

  GetPersonsInfo(payLoad: string): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.backendUrl + environment.hrUrl}Person/GetPersonsInfo?${payLoad}`);
  }
}