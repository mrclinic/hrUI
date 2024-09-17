import { RelinquishmentReason } from "src/app/demo/models/constants/hr/relinquishmentreason.model";

export namespace RelinquishmentReasonActions {

    export class AddRelinquishmentReason {
        static readonly type = '[RelinquishmentReason] Add New RelinquishmentReason';
        constructor(public payLoad: RelinquishmentReason) { };
    }
    export class UpdateRelinquishmentReason {
        static readonly type = '[RelinquishmentReason] Update the RelinquishmentReason';
        constructor(public payLoad: RelinquishmentReason) { }
    }

    export class GetAllRelinquishmentReasons {
        static readonly type = '[RelinquishmentReason] Get All RelinquishmentReasons';
        constructor(public payLoad: string) { };
    }
    export class DeleteRelinquishmentReason {
        static readonly type = '[RelinquishmentReason] Delete the RelinquishmentReason';
        constructor(public Id: string) { };
    }

    export class GetRelinquishmentReasonsInfo {
        static readonly type = '[RelinquishmentReason] Get All RelinquishmentReasons Info';
        constructor(public payLoad: string) { };
    }
}