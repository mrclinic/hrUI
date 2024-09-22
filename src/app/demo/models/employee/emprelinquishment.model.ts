import { ModificationContractType } from "../constants/modificationcontracttype.model";
import { RelinquishmentReason } from "../constants/relinquishmentreason.model";

export interface EmpRelinquishment {
    relinquishmentdate?: Date;
    contractdate?: Date;
    relinquishmentreasonid?: string;
    contracttypeid?: string;
    contractnumber?: string;
    note?: string;
    employeeid?: string;
    contracttype?: ModificationContractType;
    relinquishmentreason?: RelinquishmentReason;
    id?: string;
}
