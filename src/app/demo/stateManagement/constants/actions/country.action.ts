import { Country } from "src/app/demo/models/constants/hr/country.model";

export namespace CountryActions {

    export class AddCountry {
        static readonly type = '[Country] Add New Country';
        constructor(public payLoad: Country) { };
    }
    export class UpdateCountry {
        static readonly type = '[Country] Update the Country';
        constructor(public payLoad: Country) { }
    }

    export class GetAllCountrys {
        static readonly type = '[Country] Get All Countrys';
        constructor(public payLoad: string) { };
    }
    export class DeleteCountry {
        static readonly type = '[Country] Delete the Country';
        constructor(public Id: string) { };
    }

    export class GetCountrysInfo {
        static readonly type = '[Country] Get All Countrys Info';
        constructor(public payLoad: string) { };
    }
}