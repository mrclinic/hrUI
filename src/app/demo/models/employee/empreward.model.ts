import { FinancialIndicatorType } from "../constants/financialindicatortype.model";
import { ModificationContractType } from "../constants/modificationcontracttype.model";
import { OrgDepartment } from "../constants/org-department.model";
import { RewardType } from "../constants/rewardtype.model";
import { Person } from "./person.model";

export interface EmpReward {
    orderdate?: Date;
    executiondate?: Date;
    contractdate?: Date;
    rewardtypeid?: string;
    departmentid?: string;
    contracttypeid?: string;
    durationindays?: number;
    percentageoramount?: number;
    financialindicatortypeid?: string;
    reason?: string;
    ordernumber?: string;
    contractnumber?: string;
    contracttype?: ModificationContractType;
    department?: OrgDepartment;
    employee?: Person;
    financialindicatortype?: FinancialIndicatorType;
    rewardtype?: RewardType;
    id?: string;
}
