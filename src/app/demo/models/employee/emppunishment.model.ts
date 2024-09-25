import { ModificationContractType } from "../constants/modificationcontracttype.model";
import { OrgDepartment } from "../constants/org-department.model";
import { PunishmentType } from "../constants/punishmenttype.model";

export interface EmpPunishment {
    executiondate?: Date;
    orderdate?: Date;
    contractdate?: Date;
    issuingdepartmentid?: string;
    issuingdepartment?: OrgDepartment;
    durationindays?: number;
    orderdepartmentid?: string;
    orderdepartment?: OrgDepartment;
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
