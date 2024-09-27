import { OrgDepartment } from "./org-department.model";

export interface Branch {
    departmentid?: string;
    orgDepartment?: OrgDepartment
    name?: string;
    id?: string;
}
