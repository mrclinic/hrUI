import { FinancialImpact } from "./financialimpact.model";

export interface PunishmentType {
    financialimpactid?: string;
    financialimpact?: FinancialImpact
    name?: string;
    id?: string;
}
