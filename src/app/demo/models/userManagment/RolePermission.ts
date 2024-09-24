import { Permission } from "./Permission";
import { Role } from "./Role";

export interface RolePermission {
  id?: string;
  roleId?: string;
  permissionId?: string;
  Rrole?: Role;
  permission?: Permission;
}
