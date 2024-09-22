import { BloodGroup } from "../constants/bloodgroup.model";
import { City } from "../constants/city.model";
import { EmploymentStatusType } from "../constants/employmentstatustype.model";
import { Gender } from "../constants/gender.model";
import { MaritalStatus } from "../constants/maritalstatus.model";
import { Nationality } from "../constants/nationality.model";

export interface Person {
    identityuserid?: string;
    birthdate?: Date;
    familybookdate?: Date;
    imagepath?: string;
    employmentstatustypeid?: string;
    employmentstatustype?: EmploymentStatusType;
    genderid?: string;
    gender?: Gender;
    nationalityid?: string;
    nationality?: Nationality;
    maritalstatusid?: string;
    maritalstatus?: MaritalStatus;
    bloodgroupid?: string;
    bloodgroup?: BloodGroup;
    cityid?: string;
    city?: City;
    registrationnumber?: number;
    firstname?: string;
    lastname?: string;
    fathername?: string;
    mothername?: string;
    birthplace?: string;
    registrationplaceandnumber?: string;
    address?: string;
    nationalnumber?: string;
    idnumber?: string;
    civilregistry?: string;
    familybooknumber?: string;
    phone?: string;
    email?: string;
    note?: string;
    id?: string;
}
