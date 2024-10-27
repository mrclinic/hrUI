
export namespace UserActions {
  export class logOut {
    static readonly type = '[User] logOut';
    constructor() { };
  }

  export class LogIn {
    static readonly type = '[User] LogIn';
    constructor(public username: string, public password: string) { };
  }
}
