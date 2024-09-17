import { SubDepartment } from "src/app/demo/models/constants/hr/subdepartment.model";

export namespace SubDepartmentActions {

    export class AddSubDepartment {
        static readonly type = '[SubDepartment] Add New SubDepartment';
        constructor(public payLoad: SubDepartment) { };
    }
    export class UpdateSubDepartment {
        static readonly type = '[SubDepartment] Update the SubDepartment';
        constructor(public payLoad: SubDepartment) { }
    }

    export class GetAllSubDepartments {
        static readonly type = '[SubDepartment] Get All SubDepartments';
        constructor(public payLoad: string) { };
    }
    export class DeleteSubDepartment {
        static readonly type = '[SubDepartment] Delete the SubDepartment';
        constructor(public Id: string) { };
    }

    export class GetSubDepartmentsInfo {
        static readonly type = '[SubDepartment] Get All SubDepartments Info';
        constructor(public payLoad: string) { };
    }
}