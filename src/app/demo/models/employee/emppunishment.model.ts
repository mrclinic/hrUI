export interface EmpPunishment {
    executiondate?: Date;
    orderdate?: Date;
    contractdate?: Date;
    issuingdepartmentid?: string;
    durationindays?: number;
    orderdepartmentid?: string;
    isappearinginrecordcard?: boolean;
    contracttypeid?: string;
    punishmenttypeid?: string;
    percentageoramount?: number;
    ispercentage?: boolean;
    reason?: string;
    ordercontractnumber?: string;
    contractnumber?: string;
    id?: string;
}
