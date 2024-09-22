import { DisabilityType } from "../constants/disabilitytype.model";
import { HealthyStatus } from "../constants/healthystatus.model";
import { InsuranceSystem } from "../constants/insurancesystem.model";
import { JobCategory } from "../constants/jobcategory.model";
import { Law } from "../constants/law.model";
import { ModificationContractType } from "../constants/modificationcontracttype.model";
import { StartingType } from "../constants/startingtype.model";

export interface EmpAppointmentStatus {

    dateofappointmentdecision?: Date;
    dateofappointmentvisa?: Date;
    dateofmodifiedappointmentvisadate?: Date;
    dateofinsurancestart?: Date;
    generalregistrynumber?: number;
    insurancesystemid?: string;
    insurancesystem?: InsuranceSystem;
    engineerssyndicatenumber?: number;
    appointmentcontracttypeid?: string;
    appointmentcontracttype?: ModificationContractType;
    lawid?: string;
    law?: Law;
    healthystatusid?: string;
    healthystatus?: HealthyStatus;
    disabilitytypeid?: string;
    disabilitytype?: DisabilityType;
    jobcategoryid?: string;
    jobcategory?: JobCategory;
    modificationcontracttypeid?: string;
    modificationcontracttype?: ModificationContractType;
    startingtypeid?: string;
    startingtype?: StartingType;
    insurancenumber?: string;
    appointmencontractnumber?: string;
    appointmentcontractvisanumber?: string;
    modifiedappointmentcontractnumber?: string;
    id?: string;
}
