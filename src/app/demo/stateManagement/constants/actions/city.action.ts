import { City } from "src/app/demo/models/constants/hr/city.model";

export namespace CityActions {

    export class AddCity {
        static readonly type = '[City] Add New City';
        constructor(public payLoad: City) { };
    }
    export class UpdateCity {
        static readonly type = '[City] Update the City';
        constructor(public payLoad: City) { }
    }

    export class GetAllCitys {
        static readonly type = '[City] Get All Citys';
        constructor(public payLoad: string) { };
    }
    export class DeleteCity {
        static readonly type = '[City] Delete the City';
        constructor(public Id: string) { };
    }

    export class GetCitysInfo {
        static readonly type = '[City] Get All Citys Info';
        constructor(public payLoad: string) { };
    }
}