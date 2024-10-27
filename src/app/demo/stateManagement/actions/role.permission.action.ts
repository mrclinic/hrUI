import { RolePermission } from "src/app/demo/models/userManagment/RolePermission";

export namespace RolePermissionActions {

  export class GetRolePermissionsInfo {
    static readonly type = '[RolePermission] Get All RolePermissions With Relations';
    constructor(public payLoad: string) { };
  }

  export class SetRolePermission {
    static readonly type = '[SetRolePermission] Add List Of RolePermission';
    constructor(public payLoad: RolePermission[], public roleId: string) { };
  }
}
