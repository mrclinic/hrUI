import { Role } from "./Role";

export interface User {
  id?: string;
  fName?: string;
  lName?: string;
  userName?: string;
  passWord?: string;
  phone?: string;
  natNum?: string;
  emailAddress?: string;
  userToken?: string;
  activationCode?: string;
  isActive?: boolean;
  roleID?: string;
  role?: Role;
  permissions?: string[]
}
