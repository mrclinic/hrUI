import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  permissions: any[] = [];
  USER_KEY = 'users.loggedUser'
  user = JSON.parse(localStorage.getItem(this.USER_KEY));

  constructor() {
    this.permissions = this.user?.permissions || [];
  }

  getCurrentUserPermissions() {
    return this.permissions;
  }

  checkPermission(permission): boolean {
    return true;
    return this.permissions.includes(permission);
  }

  checkPermissions(permissions: any[]): boolean {
    return true;
    return !permissions.some((string) => this.permissions.indexOf(string) == -1);
  }
}
