import { DeputationType } from "src/app/demo/models/constants/hr/deputationtype.model";

export namespace DeputationTypeActions {

    export class AddDeputationType {
        static readonly type = '[DeputationType] Add New DeputationType';
        constructor(public payLoad: DeputationType) { };
    }
    export class UpdateDeputationType {
        static readonly type = '[DeputationType] Update the DeputationType';
        constructor(public payLoad: DeputationType) { }
    }

    export class GetAllDeputationTypes {
        static readonly type = '[DeputationType] Get All DeputationTypes';
        constructor(public payLoad: string) { };
    }
    export class DeleteDeputationType {
        static readonly type = '[DeputationType] Delete the DeputationType';
        constructor(public Id: string) { };
    }

    export class GetDeputationTypesInfo {
        static readonly type = '[DeputationType] Get All DeputationTypes Info';
        constructor(public payLoad: string) { };
    }
}