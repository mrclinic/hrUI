import { DegreesAuthority } from "../constants/degreesauthority.model";
import { Qualification } from "../constants/qualification.model";
import { Specialization } from "../constants/specialization.model";
import { Person } from "./person.model";

export interface EmpQualification {
    degreedate?: Date;
    equivalencedegreecontractdate?: Date;
    specializationid?: string;
    degreesauthorityid?: string;
    countryid?: string;
    qualificationid?: string;
    subspecialization?: string;
    equivalencecontractnumber?: string;
    degreesauthority?: DegreesAuthority;
    employee?: Person;
    qualification?: Qualification;
    specialization?: Specialization;
    id?: string;
}
