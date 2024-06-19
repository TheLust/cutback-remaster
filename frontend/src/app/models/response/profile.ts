import { Gender } from "./gender";
import { Preferences } from "./preferences";
import { Role } from "./role";

export interface Profile {

  id: number;
  role: Role;
  preferences: Preferences;
  username: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: Date;
  email: string;
  phoneNumber?: string;
}
