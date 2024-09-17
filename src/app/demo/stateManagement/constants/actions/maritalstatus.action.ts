import { MaritalStatus } from "src/app/demo/models/constants/hr/maritalstatus.model";

export namespace MaritalStatusActions {

    export class AddMaritalStatus {
        static readonly type = '[MaritalStatus] Add New MaritalStatus';
        constructor(public payLoad: MaritalStatus) { };
    }
    export class UpdateMaritalStatus {
        static readonly type = '[MaritalStatus] Update the MaritalStatus';
        constructor(public payLoad: MaritalStatus) { }
    }

    export class GetAllMaritalStatuss {
        static readonly type = '[MaritalStatus] Get All MaritalStatuss';
        constructor(public payLoad: string) { };
    }
    export class DeleteMaritalStatus {
        static readonly type = '[MaritalStatus] Delete the MaritalStatus';
        constructor(public Id: string) { };
    }

    export class GetMaritalStatussInfo {
        static readonly type = '[MaritalStatus] Get All MaritalStatuss Info';
        constructor(public payLoad: string) { };
    }
}