import { DisabilityType } from "src/app/demo/models/constants/hr/disabilitytype.model";

export namespace DisabilityTypeActions {

    export class AddDisabilityType {
        static readonly type = '[DisabilityType] Add New DisabilityType';
        constructor(public payLoad: DisabilityType) { };
    }
    export class UpdateDisabilityType {
        static readonly type = '[DisabilityType] Update the DisabilityType';
        constructor(public payLoad: DisabilityType) { }
    }

    export class GetAllDisabilityTypes {
        static readonly type = '[DisabilityType] Get All DisabilityTypes';
        constructor(public payLoad: string) { };
    }
    export class DeleteDisabilityType {
        static readonly type = '[DisabilityType] Delete the DisabilityType';
        constructor(public Id: string) { };
    }

    export class GetDisabilityTypesInfo {
        static readonly type = '[DisabilityType] Get All DisabilityTypes Info';
        constructor(public payLoad: string) { };
    }
}