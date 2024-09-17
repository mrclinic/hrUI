import { MilitaryRank } from "src/app/demo/models/constants/hr/militaryrank.model";

export namespace MilitaryRankActions {

    export class AddMilitaryRank {
        static readonly type = '[MilitaryRank] Add New MilitaryRank';
        constructor(public payLoad: MilitaryRank) { };
    }
    export class UpdateMilitaryRank {
        static readonly type = '[MilitaryRank] Update the MilitaryRank';
        constructor(public payLoad: MilitaryRank) { }
    }

    export class GetAllMilitaryRanks {
        static readonly type = '[MilitaryRank] Get All MilitaryRanks';
        constructor(public payLoad: string) { };
    }
    export class DeleteMilitaryRank {
        static readonly type = '[MilitaryRank] Delete the MilitaryRank';
        constructor(public Id: string) { };
    }

    export class GetMilitaryRanksInfo {
        static readonly type = '[MilitaryRank] Get All MilitaryRanks Info';
        constructor(public payLoad: string) { };
    }
}