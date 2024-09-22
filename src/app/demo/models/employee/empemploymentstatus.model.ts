import { ModificationContractType } from "../constants/modificationcontracttype.model";
import { StartingType } from "../constants/startingtype.model";

export interface EmpEmploymentStatus {
    startdate?: Date;
    contractdate?: Date;
    startingtypeid?: string;
    startingtype?: StartingType;
    contracttypeid?: string;
    contracttype?: ModificationContractType;
    contractnumber?: string;
    id?: string;
}
