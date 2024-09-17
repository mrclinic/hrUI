import { Role } from "src/app/demo/models/userManagment/Role";

export namespace RoleActions {

    export class AddRole {
        static readonly type = '[Role] Add New Role';
        constructor(public payLoad: Role) { };
    }
    export class UpdateRole {
        static readonly type = '[Role] Update the Role';
        constructor(public payLoad: Role) { }
    }

    export class GetAllRoles {
        static readonly type = '[Role] Get All Roles';
        constructor(public payLoad: string) { };
    }
    export class DeleteRole {
        static readonly type = '[Role] Delete the Role';
        constructor(public Id: string) { };
    }
}