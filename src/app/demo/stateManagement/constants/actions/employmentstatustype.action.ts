import { EmploymentStatusType } from "src/app/demo/models/constants/hr/employmentstatustype.model";

export namespace EmploymentStatusTypeActions {

    export class AddEmploymentStatusType {
        static readonly type = '[EmploymentStatusType] Add New EmploymentStatusType';
        constructor(public payLoad: EmploymentStatusType) { };
    }
    export class UpdateEmploymentStatusType {
        static readonly type = '[EmploymentStatusType] Update the EmploymentStatusType';
        constructor(public payLoad: EmploymentStatusType) { }
    }

    export class GetAllEmploymentStatusTypes {
        static readonly type = '[EmploymentStatusType] Get All EmploymentStatusTypes';
        constructor(public payLoad: string) { };
    }
    export class DeleteEmploymentStatusType {
        static readonly type = '[EmploymentStatusType] Delete the EmploymentStatusType';
        constructor(public Id: string) { };
    }

    export class GetEmploymentStatusTypesInfo {
        static readonly type = '[EmploymentStatusType] Get All EmploymentStatusTypes Info';
        constructor(public payLoad: string) { };
    }
}