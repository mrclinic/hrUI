import { VacationType } from "src/app/demo/models/constants/hr/vacationtype.model";

export namespace VacationTypeActions {

    export class AddVacationType {
        static readonly type = '[VacationType] Add New VacationType';
        constructor(public payLoad: VacationType) { };
    }
    export class UpdateVacationType {
        static readonly type = '[VacationType] Update the VacationType';
        constructor(public payLoad: VacationType) { }
    }

    export class GetAllVacationTypes {
        static readonly type = '[VacationType] Get All VacationTypes';
        constructor(public payLoad: string) { };
    }
    export class DeleteVacationType {
        static readonly type = '[VacationType] Delete the VacationType';
        constructor(public Id: string) { };
    }

    export class GetVacationTypesInfo {
        static readonly type = '[VacationType] Get All VacationTypes Info';
        constructor(public payLoad: string) { };
    }
}