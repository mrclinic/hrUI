import { Gender } from "../constants/gender.model";
import { JobTitle } from "../constants/jobtitle.model";
import { Nationality } from "../constants/nationality.model";
import { OccurrencePartnerType } from "../constants/occurrencepartnertype.model";

export interface EmpPartner {
    birthdate?: Date;
    occurrencedate?: Date;
    partnerorder?: number;
    genderid?: string;
    gender?: Gender;
    nationalityid?: string;
    nationality?: Nationality;
    occurrencetypeid?: string;
    occurrencetype?: OccurrencePartnerType;
    partnerworkid?: string;
    partnerwork?: JobTitle;
    mothername?: string;
    name?: string;
    occurrencecontractnumber?: string;
    id?: string;
}