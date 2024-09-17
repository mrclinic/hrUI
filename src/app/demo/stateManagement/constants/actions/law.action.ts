import { Law } from "src/app/demo/models/constants/hr/law.model";

export namespace LawActions {

    export class AddLaw {
        static readonly type = '[Law] Add New Law';
        constructor(public payLoad: Law) { };
    }
    export class UpdateLaw {
        static readonly type = '[Law] Update the Law';
        constructor(public payLoad: Law) { }
    }

    export class GetAllLaws {
        static readonly type = '[Law] Get All Laws';
        constructor(public payLoad: string) { };
    }
    export class DeleteLaw {
        static readonly type = '[Law] Delete the Law';
        constructor(public Id: string) { };
    }

    export class GetLawsInfo {
        static readonly type = '[Law] Get All Laws Info';
        constructor(public payLoad: string) { };
    }
}