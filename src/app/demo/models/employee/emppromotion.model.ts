import { EvaluationGrade } from "../constants/evaluationgrade.model";
import { PromotionPercentage } from "../constants/promotionpercentage.model";

export interface EmpPromotion {
    promotiondate?: Date;
    promotionduration?: number;
    evaluationgradeid?: string;
    evaluationgrade?: EvaluationGrade;
    newsalary?: number;
    bonusamount?: number;
    promotionpercentageid?: string;
    promotionpercentage?: PromotionPercentage;
    id?: string;
}