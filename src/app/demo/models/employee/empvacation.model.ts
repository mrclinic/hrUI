import { FinancialImpact } from "../constants/financialimpact.model";
import { ForcedVacationType } from "../constants/forcedvacationtype.model";
import { ModificationContractType } from "../constants/modificationcontracttype.model";
import { VacationType } from "../constants/vacationtype.model";
import { Person } from "./person.model";

export interface EmpVacation {
    startdate?: Date;
    contractdate?: Date;
    enddate?: Date;
    modificationcontractdate?: Date;
    actualreturndate?: Date;
    durationindays?: number;
    vacationtypeid?: string;
    vacationyear?: number;
    contracttypeid?: string;
    isappearinginrecordcard?: boolean;
    financialimpactid?: string;
    forcedvacationtypeid?: string;
    isincludedinserviceduration?: boolean;
    modificationContractTypeId?: string;
    day?: number;
    month?: number;
    year?: number;
    contractnumber?: string;
    modificationcontractnumber?: string;
    contracttype?: ModificationContractType;
    employee?: Person;
    financialimpact?: FinancialImpact;
    forcedvacationtype?: ForcedVacationType;
    modificationContractType?: ModificationContractType;
    vacationtype?: VacationType;
    id?: string;
}
