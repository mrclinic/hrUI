import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/userManagment/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  AddUser(payLoad: User): Observable<User> {
    return this.http.post<User>(`${environment.backendUrl + environment.userMgtUrl}User/CreateUser`, payLoad);
  }

  UpdateUser(payLoad: User): Observable<User> {
    return this.http.put<User>(`${environment.backendUrl + environment.userMgtUrl}User/UpdateUser`, payLoad);
  }

  DeleteUser(Id: string) {
    return this.http.delete(`${environment.backendUrl + environment.userMgtUrl}User/DeleteUser?id=${Id}`);
  }
  GetUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.backendUrl + environment.userMgtUrl}User/GetUsers`);
  }
  GetUsersInfo(payLoad: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.backendUrl + environment.userMgtUrl}User/GetUsersInfo?${payLoad}`);
  }
  LogIn(username: string, password: string): Observable<User> {
    let logInModel = {
      UserName: username,
      PassWord: password
    };
    return this.http.post<User>(`${environment.backendUrl + environment.userMgtUrl}User/logIn`, logInModel).pipe(map(user => {
      // login successful if there's a user in the response
      if (user) {
        delete user.PassWord;
      }

      return user;
    }));
  }

  SignUp(payLoad: User): Observable<User> {
    return this.http.post<User>(`${environment.backendUrl + environment.userMgtUrl}User/SignUp`, payLoad);
  }

  Activate(username: string, code: string): Observable<boolean> {
    let activateModel = {
      UserName: username,
      Code: code
    };
    return this.http.post<boolean>(`${environment.backendUrl + environment.userMgtUrl}User/activateAccount`,
      activateModel).pipe(map(user => {
        return user;
      }));
  }

  getUserInfo(userId: string): Observable<User> {
    return this.http.get<User>(`${environment.backendUrl + environment.userMgtUrl}User/getUserInfo?userID=${userId}`)
      .pipe(map(user => {
        return user;
      }));
  }

  ChangePassword(userId: string, currentPassword: string, newPassword: string): Observable<boolean> {
    let changePasswordModel = {
      UserId: userId,
      CurrentPassword: currentPassword,
      NewPassword: newPassword
    };
    return this.http.post<boolean>(`${environment.backendUrl + environment.userMgtUrl}User/ChangePassword`,
      changePasswordModel).pipe(map(user => {
        return user;
      }));
  }
}
