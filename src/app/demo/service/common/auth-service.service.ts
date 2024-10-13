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

  checkPermissions(menuPermissions: any[]): boolean {
    return true;
    let exist = false;
    menuPermissions.forEach((menuPermission) => {
      let item = this.permissions.find((z) => z.includes(menuPermission));
      if (item) {
        exist = true;
      }
    });
    return exist;
  }
}
