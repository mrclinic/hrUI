import { HealthyStatus } from "src/app/demo/models/constants/hr/healthystatus.model";

export namespace HealthyStatusActions {

    export class AddHealthyStatus {
        static readonly type = '[HealthyStatus] Add New HealthyStatus';
        constructor(public payLoad: HealthyStatus) { };
    }
    export class UpdateHealthyStatus {
        static readonly type = '[HealthyStatus] Update the HealthyStatus';
        constructor(public payLoad: HealthyStatus) { }
    }

    export class GetAllHealthyStatuss {
        static readonly type = '[HealthyStatus] Get All HealthyStatuss';
        constructor(public payLoad: string) { };
    }
    export class DeleteHealthyStatus {
        static readonly type = '[HealthyStatus] Delete the HealthyStatus';
        constructor(public Id: string) { };
    }

    export class GetHealthyStatussInfo {
        static readonly type = '[HealthyStatus] Get All HealthyStatuss Info';
        constructor(public payLoad: string) { };
    }
}