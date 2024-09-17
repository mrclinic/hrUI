import { University } from "src/app/demo/models/constants/hr/university.model";

export namespace UniversityActions {

    export class AddUniversity {
        static readonly type = '[University] Add New University';
        constructor(public payLoad: University) { };
    }
    export class UpdateUniversity {
        static readonly type = '[University] Update the University';
        constructor(public payLoad: University) { }
    }

    export class GetAllUniversitys {
        static readonly type = '[University] Get All Universitys';
        constructor(public payLoad: string) { };
    }
    export class DeleteUniversity {
        static readonly type = '[University] Delete the University';
        constructor(public Id: string) { };
    }

    export class GetUniversitysInfo {
        static readonly type = '[University] Get All Universitys Info';
        constructor(public payLoad: string) { };
    }
}