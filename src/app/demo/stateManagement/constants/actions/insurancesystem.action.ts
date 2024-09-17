import { InsuranceSystem } from "src/app/demo/models/constants/hr/insurancesystem.model";

export namespace InsuranceSystemActions {

    export class AddInsuranceSystem {
        static readonly type = '[InsuranceSystem] Add New InsuranceSystem';
        constructor(public payLoad: InsuranceSystem) { };
    }
    export class UpdateInsuranceSystem {
        static readonly type = '[InsuranceSystem] Update the InsuranceSystem';
        constructor(public payLoad: InsuranceSystem) { }
    }

    export class GetAllInsuranceSystems {
        static readonly type = '[InsuranceSystem] Get All InsuranceSystems';
        constructor(public payLoad: string) { };
    }
    export class DeleteInsuranceSystem {
        static readonly type = '[InsuranceSystem] Delete the InsuranceSystem';
        constructor(public Id: string) { };
    }

    export class GetInsuranceSystemsInfo {
        static readonly type = '[InsuranceSystem] Get All InsuranceSystems Info';
        constructor(public payLoad: string) { };
    }
}