import { ChildStatus } from "../constants/childstatus.model";
import { Gender } from "../constants/gender.model";

export interface EmpChild {

    birthdDte?: Date;
    occurrenceDate?: Date;
    childOrder?: number;
    genderId?: string;
    gender?: Gender;
    statusId?: string;
    childStatus?: ChildStatus;
    name?: string;
    motherName?: string;
    occurrenceContractNumber?: string;
    id?: string;
}
