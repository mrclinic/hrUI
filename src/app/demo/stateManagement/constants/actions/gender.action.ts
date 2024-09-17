import { Gender } from "src/app/demo/models/constants/hr/gender.model";

export namespace GenderActions {

    export class AddGender {
        static readonly type = '[Gender] Add New Gender';
        constructor(public payLoad: Gender) { };
    }
    export class UpdateGender {
        static readonly type = '[Gender] Update the Gender';
        constructor(public payLoad: Gender) { }
    }

    export class GetAllGenders {
        static readonly type = '[Gender] Get All Genders';
        constructor(public payLoad: string) { };
    }
    export class DeleteGender {
        static readonly type = '[Gender] Delete the Gender';
        constructor(public Id: string) { };
    }

    export class GetGendersInfo {
        static readonly type = '[Gender] Get All Genders Info';
        constructor(public payLoad: string) { };
    }
}