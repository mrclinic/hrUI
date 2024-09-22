import { EvaluationGrade } from "../constants/evaluationgrade.model";
import { EvaluationQuarter } from "../constants/evaluationquarter.model";

export interface EmpPerformanceEvaluation {
    reportdate?: Date;
    promotiondate?: Date;
    evaluationgradeid?: string;
    evaluationgrade?: EvaluationGrade;
    evaluationquarterid?: string;
    evaluationquarter?: EvaluationQuarter;
    reportnumber?: string;
    id?: string;
}