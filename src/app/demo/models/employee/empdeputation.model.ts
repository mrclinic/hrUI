import { City } from "../constants/city.model";
import { Country } from "../constants/country.model";
import { DeputationObjective } from "../constants/deputationobjective.model";
import { DeputationStatus } from "../constants/deputationstatus.model";
import { DeputationType } from "../constants/deputationtype.model";
import { University } from "../constants/university.model";

export interface EmpDeputation {
    startdate?: Date;
    enddate?: Date;
    returndate?: Date;
    deputationdecisiondate?: Date;
    executivecontractdate?: Date;
    startafterreturndate?: Date;
    countryid?: string;
    country?: Country;
    cityid?: string;
    city?: City;
    universityid?: string;
    university?: University;
    deputationobjectiveid?: string;
    deputationobjective?: DeputationObjective;
    deputationstatusid?: string;
    deputationstatus?: DeputationStatus;
    deputationtypeid?: string;
    deputationtype?: DeputationType;
    duration?: string;
    deputationdecisionnumber?: string;
    requiredspecialization?: string;
    executivecontractnumber?: string;
    assignedentity?: string;
    deputationreason?: string;
    id?: string;
}
