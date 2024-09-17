import { ModificationContractType } from "./modificationcontracttype.model";

export interface JobChangeReason {
    modificationcontracttypeid?: string;
    modificationcontracttype?: ModificationContractType;
    name?: string;
    id?: string;
}
