import { TerminationReason } from "src/app/demo/models/constants/hr/terminationreason.model";

export namespace TerminationReasonActions {

    export class AddTerminationReason {
        static readonly type = '[TerminationReason] Add New TerminationReason';
        constructor(public payLoad: TerminationReason) { };
    }
    export class UpdateTerminationReason {
        static readonly type = '[TerminationReason] Update the TerminationReason';
        constructor(public payLoad: TerminationReason) { }
    }

    export class GetAllTerminationReasons {
        static readonly type = '[TerminationReason] Get All TerminationReasons';
        constructor(public payLoad: string) { };
    }
    export class DeleteTerminationReason {
        static readonly type = '[TerminationReason] Delete the TerminationReason';
        constructor(public Id: string) { };
    }

    export class GetTerminationReasonsInfo {
        static readonly type = '[TerminationReason] Get All TerminationReasons Info';
        constructor(public payLoad: string) { };
    }
}