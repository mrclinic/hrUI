import { ModificationContractType } from "../constants/modificationcontracttype.model";

export interface EmpAssignment {
    contractdate?: Date;
    startdate?: Date;
    enddate?: Date;
    contracttypeid?: string;
    contracttype?: ModificationContractType;
    assignedwork?: string;
    contractnumber?: string;
    id?: string;
}