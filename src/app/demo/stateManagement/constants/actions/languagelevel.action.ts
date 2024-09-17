import { LanguageLevel } from "src/app/demo/models/constants/hr/languagelevel.model";

export namespace LanguageLevelActions {

    export class AddLanguageLevel {
        static readonly type = '[LanguageLevel] Add New LanguageLevel';
        constructor(public payLoad: LanguageLevel) { };
    }
    export class UpdateLanguageLevel {
        static readonly type = '[LanguageLevel] Update the LanguageLevel';
        constructor(public payLoad: LanguageLevel) { }
    }

    export class GetAllLanguageLevels {
        static readonly type = '[LanguageLevel] Get All LanguageLevels';
        constructor(public payLoad: string) { };
    }
    export class DeleteLanguageLevel {
        static readonly type = '[LanguageLevel] Delete the LanguageLevel';
        constructor(public Id: string) { };
    }

    export class GetLanguageLevelsInfo {
        static readonly type = '[LanguageLevel] Get All LanguageLevels Info';
        constructor(public payLoad: string) { };
    }
}