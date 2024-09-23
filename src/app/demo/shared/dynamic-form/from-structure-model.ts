export interface IFormStructure {
    type: string;
    label: string;
    name: string;
    value: string | number | boolean;
    options?: { label: string; value: number | string | boolean }[];
    validations?: {
        name: string;
        validator: string;
        message: string;
    }[];
    placeHolder?: string;
}