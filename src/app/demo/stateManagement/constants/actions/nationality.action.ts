import { Nationality } from "src/app/demo/models/constants/hr/nationality.model";

export namespace NationalityActions {

    export class AddNationality {
        static readonly type = '[Nationality] Add New Nationality';
        constructor(public payLoad: Nationality) { };
    }
    export class UpdateNationality {
        static readonly type = '[Nationality] Update the Nationality';
        constructor(public payLoad: Nationality) { }
    }

    export class GetAllNationalitys {
        static readonly type = '[Nationality] Get All Nationalitys';
        constructor(public payLoad: string) { };
    }
    export class DeleteNationality {
        static readonly type = '[Nationality] Delete the Nationality';
        constructor(public Id: string) { };
    }

    export class GetNationalitysInfo {
        static readonly type = '[Nationality] Get All Nationalitys Info';
        constructor(public payLoad: string) { };
    }
}