import { Department } from "./department.model";
import { SubDepartment } from "./subdepartment.model";

export interface Branch {
    departmentid?: string;
    department?: Department
    subdepartmentid?: string;
    subdepartment?: SubDepartment
    name?: string;
    id?: string;
}
