import { Permission } from "./Permission";

export interface Role {
  id?: string;
  name?: string;
  displayName?: string;
  permissions?: Permission[];
  statusCode?: number;
}
