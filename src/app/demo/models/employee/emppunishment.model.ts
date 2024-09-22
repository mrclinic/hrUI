import { Department } from "../constants/department.model";
import { ModificationContractType } from "../constants/modificationcontracttype.model";
import { PunishmentType } from "../constants/punishmenttype.model";

export interface EmpPunishment {
    executiondate?: Date;
    orderdate?: Date;
    contractdate?: Date;
    issuingdepartmentid?: string;
    issuingdepartment?: Department;
    durationindays?: number;
    orderdepartmentid?: string;
    orderdepartment?: Department;
    isappearinginrecordcard?: boolean;
    contracttypeid?: string;
    contracttype?: ModificationContractType;
    punishmenttypeid?: string;
    punishmenttype?: PunishmentType;
    percentageoramount?: number;
    ispercentage?: boolean;
    reason?: string;
    ordercontractnumber?: string;
    contractnumber?: string;
    id?: string;
}
