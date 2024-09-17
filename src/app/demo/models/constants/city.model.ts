import { Country } from "./country.model";

export interface City {
    countryid?: string;
    country?: Country;
    name?: string;
    id?: string;
}
