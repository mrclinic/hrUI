import { DocType } from "../constants/doctype.model";

export interface EmpDoc {
    id: string;
    docDate: Date;
    docNumber: string;
    docSrc: string;
    docDescription: string;
    content: string;
    docTypeId: string;
    note: string;
    docType: DocType;
    refId: string;
    employeeId: string;
    fileType: string;
    extension: string;
}
