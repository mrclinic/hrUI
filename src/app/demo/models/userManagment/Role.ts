import { Permission } from "./Permission";

export interface Role {
  id?: string;
  Name?: string;
  DisplayName?: string;
  Permissions?: Permission[];
  StatusCode?: number;
}
