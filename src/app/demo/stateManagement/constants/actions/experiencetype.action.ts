import { ExperienceType } from "src/app/demo/models/constants/hr/experiencetype.model";

export namespace ExperienceTypeActions {

    export class AddExperienceType {
        static readonly type = '[ExperienceType] Add New ExperienceType';
        constructor(public payLoad: ExperienceType) { };
    }
    export class UpdateExperienceType {
        static readonly type = '[ExperienceType] Update the ExperienceType';
        constructor(public payLoad: ExperienceType) { }
    }

    export class GetAllExperienceTypes {
        static readonly type = '[ExperienceType] Get All ExperienceTypes';
        constructor(public payLoad: string) { };
    }
    export class DeleteExperienceType {
        static readonly type = '[ExperienceType] Delete the ExperienceType';
        constructor(public Id: string) { };
    }

    export class GetExperienceTypesInfo {
        static readonly type = '[ExperienceType] Get All ExperienceTypes Info';
        constructor(public payLoad: string) { };
    }
}