import { FinancialImpact } from "src/app/demo/models/constants/hr/financialimpact.model";

export namespace FinancialImpactActions {

    export class AddFinancialImpact {
        static readonly type = '[FinancialImpact] Add New FinancialImpact';
        constructor(public payLoad: FinancialImpact) { };
    }
    export class UpdateFinancialImpact {
        static readonly type = '[FinancialImpact] Update the FinancialImpact';
        constructor(public payLoad: FinancialImpact) { }
    }

    export class GetAllFinancialImpacts {
        static readonly type = '[FinancialImpact] Get All FinancialImpacts';
        constructor(public payLoad: string) { };
    }
    export class DeleteFinancialImpact {
        static readonly type = '[FinancialImpact] Delete the FinancialImpact';
        constructor(public Id: string) { };
    }

    export class GetFinancialImpactsInfo {
        static readonly type = '[FinancialImpact] Get All FinancialImpacts Info';
        constructor(public payLoad: string) { };
    }
}