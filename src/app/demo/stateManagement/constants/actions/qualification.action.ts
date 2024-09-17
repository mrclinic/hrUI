import { Qualification } from "src/app/demo/models/constants/hr/qualification.model";

export namespace QualificationActions {

    export class AddQualification {
        static readonly type = '[Qualification] Add New Qualification';
        constructor(public payLoad: Qualification) { };
    }
    export class UpdateQualification {
        static readonly type = '[Qualification] Update the Qualification';
        constructor(public payLoad: Qualification) { }
    }

    export class GetAllQualifications {
        static readonly type = '[Qualification] Get All Qualifications';
        constructor(public payLoad: string) { };
    }
    export class DeleteQualification {
        static readonly type = '[Qualification] Delete the Qualification';
        constructor(public Id: string) { };
    }

    export class GetQualificationsInfo {
        static readonly type = '[Qualification] Get All Qualifications Info';
        constructor(public payLoad: string) { };
    }
}