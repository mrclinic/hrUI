import { MilitaryRank } from "../constants/militaryrank.model";
import { MilitarySpecialization } from "../constants/militaryspecialization.model";

export interface EmpMilitaryService {
    startdate?: Date;
    enddate?: Date;
    militaryrankid?: string;
    militaryrank?: MilitaryRank;
    militaryspecializationid?: string;
    militaryspecialization?: MilitarySpecialization;
    militarynumber?: string;
    reservenumber?: string;
    cohortnumber?: string;
    recruitmentbranch?: string;
    recruitmentnumber?: string;
    id?: string;
}
