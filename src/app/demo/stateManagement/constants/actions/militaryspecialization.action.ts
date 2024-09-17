import { MilitarySpecialization } from "src/app/demo/models/constants/hr/militaryspecialization.model";

export namespace MilitarySpecializationActions {

    export class AddMilitarySpecialization {
        static readonly type = '[MilitarySpecialization] Add New MilitarySpecialization';
        constructor(public payLoad: MilitarySpecialization) { };
    }
    export class UpdateMilitarySpecialization {
        static readonly type = '[MilitarySpecialization] Update the MilitarySpecialization';
        constructor(public payLoad: MilitarySpecialization) { }
    }

    export class GetAllMilitarySpecializations {
        static readonly type = '[MilitarySpecialization] Get All MilitarySpecializations';
        constructor(public payLoad: string) { };
    }
    export class DeleteMilitarySpecialization {
        static readonly type = '[MilitarySpecialization] Delete the MilitarySpecialization';
        constructor(public Id: string) { };
    }

    export class GetMilitarySpecializationsInfo {
        static readonly type = '[MilitarySpecialization] Get All MilitarySpecializations Info';
        constructor(public payLoad: string) { };
    }
}