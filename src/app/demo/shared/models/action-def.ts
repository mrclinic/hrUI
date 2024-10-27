export interface ActionDef {
  label?: string;
  icon?: string;
  cssClass?: string;
  delegateFunction?: (...args: any[]) => any;
  visible?: boolean;
  disable?: (...args: any[]) => boolean;
  type?: any
  tooltip?: string;
  redirectUrl?: string;
  queryParam?: string
}
export enum TABLE_ACTION {
  EDIT = 1,
  Add = 2,
  DELETE = 3,
  DOWNLOAD = 4,
  NAVIGATE = 5,
  UPLOAD = 6,
  DIALOG = 7
}
