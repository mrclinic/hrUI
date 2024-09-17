import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../../models/userManagment/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  AddUserProfile(payLoad: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${environment.backendUrl + environment.userMgtUrl}UserProfile/CreateUserProfile`, payLoad);
  }

  UpdateUserProfile(payLoad: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${environment.backendUrl + environment.userMgtUrl}UserProfile/UpdateUserProfile`, payLoad);
  }

  DeleteUserProfile(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.userMgtUrl}UserProfile/DeleteUserProfile?id=${Id}`);
  }
  GetAllUserProfiles(payLoad: string): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${environment.backendUrl + environment.userMgtUrl}UserProfile/GetUserProfiles?${payLoad}`);
  }
  GetUserProfilesInfo(payLoad: string): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${environment.backendUrl + environment.userMgtUrl}UserProfile/GetUserProfilesInfo?${payLoad}`);
  }
  GetMyUserProfiles(payLoad: string): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${environment.backendUrl + environment.userMgtUrl}UserProfile/GetMyUserProfiles?${payLoad}`);
  }

  GetAllUserProfilesInfo(payLoad: string): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${environment.backendUrl + environment.userMgtUrl}UserProfile/GetAllUserProfilesInfo?${payLoad}`);
  }
}
