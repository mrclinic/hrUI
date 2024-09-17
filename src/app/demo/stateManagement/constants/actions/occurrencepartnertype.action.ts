import { OccurrencePartnerType } from "src/app/demo/models/constants/hr/occurrencepartnertype.model";

export namespace OccurrencePartnerTypeActions {

    export class AddOccurrencePartnerType {
        static readonly type = '[OccurrencePartnerType] Add New OccurrencePartnerType';
        constructor(public payLoad: OccurrencePartnerType) { };
    }
    export class UpdateOccurrencePartnerType {
        static readonly type = '[OccurrencePartnerType] Update the OccurrencePartnerType';
        constructor(public payLoad: OccurrencePartnerType) { }
    }

    export class GetAllOccurrencePartnerTypes {
        static readonly type = '[OccurrencePartnerType] Get All OccurrencePartnerTypes';
        constructor(public payLoad: string) { };
    }
    export class DeleteOccurrencePartnerType {
        static readonly type = '[OccurrencePartnerType] Delete the OccurrencePartnerType';
        constructor(public Id: string) { };
    }

    export class GetOccurrencePartnerTypesInfo {
        static readonly type = '[OccurrencePartnerType] Get All OccurrencePartnerTypes Info';
        constructor(public payLoad: string) { };
    }
}