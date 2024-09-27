import { User } from "./User";

export interface UserProfile {
  id?: string;
  fatherName?: string;
  motherName?: string;
  birthPlace?: string;
  birthDate?: Date;
  gender?: string;
  address?: string;
  cardNumber?: string;
  userId?: string;
  user?: User;
}
