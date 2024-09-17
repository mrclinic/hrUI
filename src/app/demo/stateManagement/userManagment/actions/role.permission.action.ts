import { RolePermission } from "src/app/demo/models/userManagment/RolePermission";

export namespace RolePermissionActions {

  export class AddRolePermission {
    static readonly type = '[RolePermission] Add New RolePermission';
    constructor(public payLoad: RolePermission) { };
  }
  export class UpdateRolePermission {
    static readonly type = '[RolePermission] Update the RolePermission';
    constructor(public payLoad: RolePermission) { }
  }

  export class GetAllRolePermissions {
    static readonly type = '[RolePermission] Get All RolePermissions';
    constructor(public payLoad: string) { };
  }

  export class GetRolePermissionsInfo {
    static readonly type = '[RolePermission] Get All RolePermissions With Relations';
    constructor(public payLoad: string) { };
  }
  export class DeleteRolePermission {
    static readonly type = '[RolePermission] Delete the RolePermission';
    constructor(public Id: string) { };
  }

  export class SetRolePermission {
    static readonly type = '[SetRolePermission] Add List Of RolePermission';
    constructor(public payLoad: RolePermission[], public roleId: string) { };
  }
}
