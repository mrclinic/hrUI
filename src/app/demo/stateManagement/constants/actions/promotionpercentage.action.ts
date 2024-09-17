import { PromotionPercentage } from "src/app/demo/models/constants/hr/promotionpercentage.model";

export namespace PromotionPercentageActions {

    export class AddPromotionPercentage {
        static readonly type = '[PromotionPercentage] Add New PromotionPercentage';
        constructor(public payLoad: PromotionPercentage) { };
    }
    export class UpdatePromotionPercentage {
        static readonly type = '[PromotionPercentage] Update the PromotionPercentage';
        constructor(public payLoad: PromotionPercentage) { }
    }

    export class GetAllPromotionPercentages {
        static readonly type = '[PromotionPercentage] Get All PromotionPercentages';
        constructor(public payLoad: string) { };
    }
    export class DeletePromotionPercentage {
        static readonly type = '[PromotionPercentage] Delete the PromotionPercentage';
        constructor(public Id: string) { };
    }

    export class GetPromotionPercentagesInfo {
        static readonly type = '[PromotionPercentage] Get All PromotionPercentages Info';
        constructor(public payLoad: string) { };
    }
}