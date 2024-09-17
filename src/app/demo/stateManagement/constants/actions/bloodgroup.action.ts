import { BloodGroup } from "src/app/demo/models/constants/bloodgroup.model";

export namespace BloodGroupActions {

    export class AddBloodGroup {
        static readonly type = '[BloodGroup] Add New BloodGroup';
        constructor(public payLoad: BloodGroup) { };
    }
    export class UpdateBloodGroup {
        static readonly type = '[BloodGroup] Update the BloodGroup';
        constructor(public payLoad: BloodGroup) { }
    }

    export class GetAllBloodGroups {
        static readonly type = '[BloodGroup] Get All BloodGroups';
        constructor(public payLoad: string) { };
    }
    export class DeleteBloodGroup {
        static readonly type = '[BloodGroup] Delete the BloodGroup';
        constructor(public Id: string) { };
    }

    export class GetBloodGroupsInfo {
        static readonly type = '[BloodGroup] Get All BloodGroups Info';
        constructor(public payLoad: string) { };
    }
}