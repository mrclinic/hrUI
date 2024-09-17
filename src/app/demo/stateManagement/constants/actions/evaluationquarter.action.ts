import { EvaluationQuarter } from "src/app/demo/models/constants/hr/evaluationquarter.model";

export namespace EvaluationQuarterActions {

    export class AddEvaluationQuarter {
        static readonly type = '[EvaluationQuarter] Add New EvaluationQuarter';
        constructor(public payLoad: EvaluationQuarter) { };
    }
    export class UpdateEvaluationQuarter {
        static readonly type = '[EvaluationQuarter] Update the EvaluationQuarter';
        constructor(public payLoad: EvaluationQuarter) { }
    }

    export class GetAllEvaluationQuarters {
        static readonly type = '[EvaluationQuarter] Get All EvaluationQuarters';
        constructor(public payLoad: string) { };
    }
    export class DeleteEvaluationQuarter {
        static readonly type = '[EvaluationQuarter] Delete the EvaluationQuarter';
        constructor(public Id: string) { };
    }

    export class GetEvaluationQuartersInfo {
        static readonly type = '[EvaluationQuarter] Get All EvaluationQuarters Info';
        constructor(public payLoad: string) { };
    }
}