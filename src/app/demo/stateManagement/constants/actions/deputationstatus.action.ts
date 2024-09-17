import { DeputationStatus } from "src/app/demo/models/constants/hr/deputationstatus.model";

export namespace DeputationStatusActions {

    export class AddDeputationStatus {
        static readonly type = '[DeputationStatus] Add New DeputationStatus';
        constructor(public payLoad: DeputationStatus) { };
    }
    export class UpdateDeputationStatus {
        static readonly type = '[DeputationStatus] Update the DeputationStatus';
        constructor(public payLoad: DeputationStatus) { }
    }

    export class GetAllDeputationStatuss {
        static readonly type = '[DeputationStatus] Get All DeputationStatuss';
        constructor(public payLoad: string) { };
    }
    export class DeleteDeputationStatus {
        static readonly type = '[DeputationStatus] Delete the DeputationStatus';
        constructor(public Id: string) { };
    }

    export class GetDeputationStatussInfo {
        static readonly type = '[DeputationStatus] Get All DeputationStatuss Info';
        constructor(public payLoad: string) { };
    }
}