import { ChildStatus } from "../constants/childstatus.model";
import { Gender } from "../constants/gender.model";

export interface EmpChild {

    birthdate?: Date;
    occurrencedate?: Date;
    childorder?: number;
    genderid?: string;
    gender?: Gender;
    statusid?: string;
    childstatus?: ChildStatus;
    name?: string;
    mothername?: string;
    occurrencecontractnumber?: string;
    id?: string;
}
