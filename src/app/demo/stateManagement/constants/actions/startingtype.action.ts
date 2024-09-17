import { StartingType } from "src/app/demo/models/constants/hr/startingtype.model";

export namespace StartingTypeActions {

    export class AddStartingType {
        static readonly type = '[StartingType] Add New StartingType';
        constructor(public payLoad: StartingType) { };
    }
    export class UpdateStartingType {
        static readonly type = '[StartingType] Update the StartingType';
        constructor(public payLoad: StartingType) { }
    }

    export class GetAllStartingTypes {
        static readonly type = '[StartingType] Get All StartingTypes';
        constructor(public payLoad: string) { };
    }
    export class DeleteStartingType {
        static readonly type = '[StartingType] Delete the StartingType';
        constructor(public Id: string) { };
    }

    export class GetStartingTypesInfo {
        static readonly type = '[StartingType] Get All StartingTypes Info';
        constructor(public payLoad: string) { };
    }
}