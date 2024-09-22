import { JobChangeReason } from "../constants/jobchangereason.model";
import { JobTitle } from "../constants/jobtitle.model";
import { ModificationContractType } from "../constants/modificationcontracttype.model";

export interface EmpEmploymentChange {
    dateofappointmentvisa?: Date;
    dateofstart?: Date;
    dateofchange?: Date;
    dateofcontract?: Date;
    salary?: number;
    insurancesalary?: number;
    jobchangereasonid?: string;
    jobchangereason?: JobChangeReason;
    modificationcontracttypeid?: string;
    modificationcontracttype?: ModificationContractType;
    jobtitleid?: string;
    jobtitle?: JobTitle;
    workplace?: string;
    visanumber?: string;
    contractnumber?: string;
    id?: string;
}