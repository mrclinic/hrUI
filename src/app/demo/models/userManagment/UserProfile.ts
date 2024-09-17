import { User } from "./User";

export interface UserProfile {
  Id?: string;
  FatherName?: string;
  MotherName?: string;
  BirthPlace?: string;
  BirthDate?: Date;
  Gender?: string;
  Address?: string;
  CardNumber?: string;
  UserId?: string;
  User?: User;
}
