import { ModificationContractType } from "src/app/demo/models/constants/hr/modificationcontracttype.model";

export namespace ModificationContractTypeActions {

    export class AddModificationContractType {
        static readonly type = '[ModificationContractType] Add New ModificationContractType';
        constructor(public payLoad: ModificationContractType) { };
    }
    export class UpdateModificationContractType {
        static readonly type = '[ModificationContractType] Update the ModificationContractType';
        constructor(public payLoad: ModificationContractType) { }
    }

    export class GetAllModificationContractTypes {
        static readonly type = '[ModificationContractType] Get All ModificationContractTypes';
        constructor(public payLoad: string) { };
    }
    export class DeleteModificationContractType {
        static readonly type = '[ModificationContractType] Delete the ModificationContractType';
        constructor(public Id: string) { };
    }

    export class GetModificationContractTypesInfo {
        static readonly type = '[ModificationContractType] Get All ModificationContractTypes Info';
        constructor(public payLoad: string) { };
    }
}