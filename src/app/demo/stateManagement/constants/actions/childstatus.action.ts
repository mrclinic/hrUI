import { ChildStatus } from "src/app/demo/models/constants/hr/childstatus.model";

export namespace ChildStatusActions {

    export class AddChildStatus {
        static readonly type = '[ChildStatus] Add New ChildStatus';
        constructor(public payLoad: ChildStatus) { };
    }
    export class UpdateChildStatus {
        static readonly type = '[ChildStatus] Update the ChildStatus';
        constructor(public payLoad: ChildStatus) { }
    }

    export class GetAllChildStatuss {
        static readonly type = '[ChildStatus] Get All ChildStatuss';
        constructor(public payLoad: string) { };
    }
    export class DeleteChildStatus {
        static readonly type = '[ChildStatus] Delete the ChildStatus';
        constructor(public Id: string) { };
    }

    export class GetChildStatussInfo {
        static readonly type = '[ChildStatus] Get All ChildStatuss Info';
        constructor(public payLoad: string) { };
    }
}