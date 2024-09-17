import { Permission } from "src/app/demo/models/userManagment/Permission";

export namespace PermissionActions {

  export class AddPermission {
    static readonly type = '[Permission] Add New Permission';
    constructor(public payLoad: Permission) { };
  }
  export class UpdatePermission {
    static readonly type = '[Permission] Update the Permission';
    constructor(public payLoad: Permission) { }
  }

  export class GetAllPermissions {
    static readonly type = '[Permission] Get All Permissions';
    constructor(public payLoad: string) { };
  }
  export class DeletePermission {
    static readonly type = '[Permission] Delete the Permission';
    constructor(public Id: string) { };
  }

  export class CheckPermission {
    static readonly type = '[Permission] Check Permission';
    constructor(public permName: string) { };
  }
}
