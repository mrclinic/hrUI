import { EvaluationGrade } from "src/app/demo/models/constants/hr/evaluationgrade.model";

export namespace EvaluationGradeActions {

    export class AddEvaluationGrade {
        static readonly type = '[EvaluationGrade] Add New EvaluationGrade';
        constructor(public payLoad: EvaluationGrade) { };
    }
    export class UpdateEvaluationGrade {
        static readonly type = '[EvaluationGrade] Update the EvaluationGrade';
        constructor(public payLoad: EvaluationGrade) { }
    }

    export class GetAllEvaluationGrades {
        static readonly type = '[EvaluationGrade] Get All EvaluationGrades';
        constructor(public payLoad: string) { };
    }
    export class DeleteEvaluationGrade {
        static readonly type = '[EvaluationGrade] Delete the EvaluationGrade';
        constructor(public Id: string) { };
    }

    export class GetEvaluationGradesInfo {
        static readonly type = '[EvaluationGrade] Get All EvaluationGrades Info';
        constructor(public payLoad: string) { };
    }
}