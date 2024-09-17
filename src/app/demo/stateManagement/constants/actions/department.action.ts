import { Department } from "src/app/demo/models/constants/hr/department.model";

export namespace DepartmentActions {

    export class AddDepartment {
        static readonly type = '[Department] Add New Department';
        constructor(public payLoad: Department) { };
    }
    export class UpdateDepartment {
        static readonly type = '[Department] Update the Department';
        constructor(public payLoad: Department) { }
    }

    export class GetAllDepartments {
        static readonly type = '[Department] Get All Departments';
        constructor(public payLoad: string) { };
    }
    export class DeleteDepartment {
        static readonly type = '[Department] Delete the Department';
        constructor(public Id: string) { };
    }

    export class GetDepartmentsInfo {
        static readonly type = '[Department] Get All Departments Info';
        constructor(public payLoad: string) { };
    }
}