import { Permission } from "./Permission";
import { Role } from "./Role";

export interface RolePermission {
  Id?: string;
  RoleId?: string;
  PermissionId?: string;
  Role?: Role;
  Permission?: Permission;
}
