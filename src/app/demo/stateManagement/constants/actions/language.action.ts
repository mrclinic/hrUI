import { Language } from "src/app/demo/models/constants/hr/language.model";

export namespace LanguageActions {

    export class AddLanguage {
        static readonly type = '[Language] Add New Language';
        constructor(public payLoad: Language) { };
    }
    export class UpdateLanguage {
        static readonly type = '[Language] Update the Language';
        constructor(public payLoad: Language) { }
    }

    export class GetAllLanguages {
        static readonly type = '[Language] Get All Languages';
        constructor(public payLoad: string) { };
    }
    export class DeleteLanguage {
        static readonly type = '[Language] Delete the Language';
        constructor(public Id: string) { };
    }

    export class GetLanguagesInfo {
        static readonly type = '[Language] Get All Languages Info';
        constructor(public payLoad: string) { };
    }
}