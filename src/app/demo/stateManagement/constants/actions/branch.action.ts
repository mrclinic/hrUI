import { Branch } from "src/app/demo/models/constants/hr/branch.model";

export namespace BranchActions {

    export class AddBranch {
        static readonly type = '[Branch] Add New Branch';
        constructor(public payLoad: Branch) { };
    }
    export class UpdateBranch {
        static readonly type = '[Branch] Update the Branch';
        constructor(public payLoad: Branch) { }
    }

    export class GetAllBranchs {
        static readonly type = '[Branch] Get All Branchs';
        constructor(public payLoad: string) { };
    }
    export class DeleteBranch {
        static readonly type = '[Branch] Delete the Branch';
        constructor(public Id: string) { };
    }

    export class GetBranchsInfo {
        static readonly type = '[Branch] Get All Branchs Info';
        constructor(public payLoad: string) { };
    }
}