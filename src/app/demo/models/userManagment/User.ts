import { Role } from "./Role";

export interface User {
  id?: string;
  FName?: string;
  LName?: string;
  UserName?: string;
  PassWord?: string;
  Phone?: string;
  NatNum?: string;
  EmailAddress?: string;
  userToken?: string;
  ActivationCode?: string;
  IsActive?: boolean;
  roleID?: string;
  Role?: Role;
  Permissions?: string[]
}
