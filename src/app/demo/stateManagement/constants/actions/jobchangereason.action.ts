import { JobChangeReason } from "src/app/demo/models/constants/hr/jobchangereason.model";

export namespace JobChangeReasonActions {

    export class AddJobChangeReason {
        static readonly type = '[JobChangeReason] Add New JobChangeReason';
        constructor(public payLoad: JobChangeReason) { };
    }
    export class UpdateJobChangeReason {
        static readonly type = '[JobChangeReason] Update the JobChangeReason';
        constructor(public payLoad: JobChangeReason) { }
    }

    export class GetAllJobChangeReasons {
        static readonly type = '[JobChangeReason] Get All JobChangeReasons';
        constructor(public payLoad: string) { };
    }
    export class DeleteJobChangeReason {
        static readonly type = '[JobChangeReason] Delete the JobChangeReason';
        constructor(public Id: string) { };
    }

    export class GetJobChangeReasonsInfo {
        static readonly type = '[JobChangeReason] Get All JobChangeReasons Info';
        constructor(public payLoad: string) { };
    }
}