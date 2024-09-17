import { ForcedVacationType } from "src/app/demo/models/constants/hr/forcedvacationtype.model";

export namespace ForcedVacationTypeActions {

    export class AddForcedVacationType {
        static readonly type = '[ForcedVacationType] Add New ForcedVacationType';
        constructor(public payLoad: ForcedVacationType) { };
    }
    export class UpdateForcedVacationType {
        static readonly type = '[ForcedVacationType] Update the ForcedVacationType';
        constructor(public payLoad: ForcedVacationType) { }
    }

    export class GetAllForcedVacationTypes {
        static readonly type = '[ForcedVacationType] Get All ForcedVacationTypes';
        constructor(public payLoad: string) { };
    }
    export class DeleteForcedVacationType {
        static readonly type = '[ForcedVacationType] Delete the ForcedVacationType';
        constructor(public Id: string) { };
    }

    export class GetForcedVacationTypesInfo {
        static readonly type = '[ForcedVacationType] Get All ForcedVacationTypes Info';
        constructor(public payLoad: string) { };
    }
}