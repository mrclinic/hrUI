import { PunishmentType } from "src/app/demo/models/constants/hr/punishmenttype.model";

export namespace PunishmentTypeActions {

    export class AddPunishmentType {
        static readonly type = '[PunishmentType] Add New PunishmentType';
        constructor(public payLoad: PunishmentType) { };
    }
    export class UpdatePunishmentType {
        static readonly type = '[PunishmentType] Update the PunishmentType';
        constructor(public payLoad: PunishmentType) { }
    }

    export class GetAllPunishmentTypes {
        static readonly type = '[PunishmentType] Get All PunishmentTypes';
        constructor(public payLoad: string) { };
    }
    export class DeletePunishmentType {
        static readonly type = '[PunishmentType] Delete the PunishmentType';
        constructor(public Id: string) { };
    }

    export class GetPunishmentTypesInfo {
        static readonly type = '[PunishmentType] Get All PunishmentTypes Info';
        constructor(public payLoad: string) { };
    }
}