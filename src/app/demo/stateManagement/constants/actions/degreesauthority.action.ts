import { DegreesAuthority } from "src/app/demo/models/constants/hr/degreesauthority.model";

export namespace DegreesAuthorityActions {

    export class AddDegreesAuthority {
        static readonly type = '[DegreesAuthority] Add New DegreesAuthority';
        constructor(public payLoad: DegreesAuthority) { };
    }
    export class UpdateDegreesAuthority {
        static readonly type = '[DegreesAuthority] Update the DegreesAuthority';
        constructor(public payLoad: DegreesAuthority) { }
    }

    export class GetAllDegreesAuthoritys {
        static readonly type = '[DegreesAuthority] Get All DegreesAuthoritys';
        constructor(public payLoad: string) { };
    }
    export class DeleteDegreesAuthority {
        static readonly type = '[DegreesAuthority] Delete the DegreesAuthority';
        constructor(public Id: string) { };
    }

    export class GetDegreesAuthoritysInfo {
        static readonly type = '[DegreesAuthority] Get All DegreesAuthoritys Info';
        constructor(public payLoad: string) { };
    }
}