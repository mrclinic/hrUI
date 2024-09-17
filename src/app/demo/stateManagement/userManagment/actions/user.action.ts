import { User } from "src/app/demo/models/userManagment/User";

export namespace UserActions {

  export class AddUser {
    static readonly type = '[User] Add new User';
    constructor(public payLoad: User) { }
  }

  export class UpdateUser {
    static readonly type = '[User] Update the User';
    constructor(public payLoad: User) { }
  }

  export class GetUsers {
    static readonly type = '[User] Get All Users';
    constructor() { };
  }

  export class GetUsersInfo {
    static readonly type = '[User] Get All Users Info';
    constructor(public payLoad: string) { };
  }
  export class DeleteUser {
    static readonly type = '[User] Delete the User';
    constructor(public Id: string) { };
  }

  /* login/signup*/
  export class LogIn {
    static readonly type = '[User] LogIn';
    constructor(public username: string, public password: string) { };
  }
  export class SignUp {
    static readonly type = '[User] Create New Account';
    constructor(public payLoad: any) { };
  }

  export class Activate {
    static readonly type = '[User] Activate';
    constructor(public username: string, public code: string) { };
  }

  export class getUserInfo {
    static readonly type = '[User] get User Info';
    constructor(public Id: string) { };
  }

  export class logOut {
    static readonly type = '[User] logOut';
    constructor() { };
  }

  export class ChangePassword {
    static readonly type = '[User] Change Password';
    constructor(public userId: string, public currentPassword: string, public newPassword: string) { };
  }
}
