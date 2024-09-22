import { ModificationContractType } from "../constants/modificationcontracttype.model";

export interface EmpTrainingCourse {
    startdate?: Date;
    enddate?: Date;
    contractdate?: Date;
    contracttypeid?: string;
    displayonrecordcard?: boolean;
    coursename?: string;
    coursesource?: string;
    contractnumber?: string;
    contracttype?: ModificationContractType;
    id?: string;
}
