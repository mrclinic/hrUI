import { RewardType } from "src/app/demo/models/constants/hr/rewardtype.model";

export namespace RewardTypeActions {

    export class AddRewardType {
        static readonly type = '[RewardType] Add New RewardType';
        constructor(public payLoad: RewardType) { };
    }
    export class UpdateRewardType {
        static readonly type = '[RewardType] Update the RewardType';
        constructor(public payLoad: RewardType) { }
    }

    export class GetAllRewardTypes {
        static readonly type = '[RewardType] Get All RewardTypes';
        constructor(public payLoad: string) { };
    }
    export class DeleteRewardType {
        static readonly type = '[RewardType] Delete the RewardType';
        constructor(public Id: string) { };
    }

    export class GetRewardTypesInfo {
        static readonly type = '[RewardType] Get All RewardTypes Info';
        constructor(public payLoad: string) { };
    }
}