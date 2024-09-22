import { ModificationContractType } from "../constants/modificationcontracttype.model";

export interface EmpWorkPlace {
    dateofstart?: Date;
    dateofrelinquishment?: Date;
    dateofcontract?: Date;
    contracttypeid?: string;
    contractnumber?: string;
    contracttype?: ModificationContractType;
    id?: string;
}
