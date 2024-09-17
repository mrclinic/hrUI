import { FinancialIndicatorType } from "src/app/demo/models/constants/hr/financialindicatortype.model";

export namespace FinancialIndicatorTypeActions {

    export class AddFinancialIndicatorType {
        static readonly type = '[FinancialIndicatorType] Add New FinancialIndicatorType';
        constructor(public payLoad: FinancialIndicatorType) { };
    }
    export class UpdateFinancialIndicatorType {
        static readonly type = '[FinancialIndicatorType] Update the FinancialIndicatorType';
        constructor(public payLoad: FinancialIndicatorType) { }
    }

    export class GetAllFinancialIndicatorTypes {
        static readonly type = '[FinancialIndicatorType] Get All FinancialIndicatorTypes';
        constructor(public payLoad: string) { };
    }
    export class DeleteFinancialIndicatorType {
        static readonly type = '[FinancialIndicatorType] Delete the FinancialIndicatorType';
        constructor(public Id: string) { };
    }

    export class GetFinancialIndicatorTypesInfo {
        static readonly type = '[FinancialIndicatorType] Get All FinancialIndicatorTypes Info';
        constructor(public payLoad: string) { };
    }
}