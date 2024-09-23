import { ModificationContractType } from "./modificationcontracttype.model";

export interface JobChangeReason {
    modificationContractTypeId?: string;
    modificationContractType?: ModificationContractType;
    name?: string;
    id?: string;
}
