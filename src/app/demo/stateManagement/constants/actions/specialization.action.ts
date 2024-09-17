import { Specialization } from "src/app/demo/models/constants/hr/specialization.model";

export namespace SpecializationActions {

    export class AddSpecialization {
        static readonly type = '[Specialization] Add New Specialization';
        constructor(public payLoad: Specialization) { };
    }
    export class UpdateSpecialization {
        static readonly type = '[Specialization] Update the Specialization';
        constructor(public payLoad: Specialization) { }
    }

    export class GetAllSpecializations {
        static readonly type = '[Specialization] Get All Specializations';
        constructor(public payLoad: string) { };
    }
    export class DeleteSpecialization {
        static readonly type = '[Specialization] Delete the Specialization';
        constructor(public Id: string) { };
    }

    export class GetSpecializationsInfo {
        static readonly type = '[Specialization] Get All Specializations Info';
        constructor(public payLoad: string) { };
    }
}