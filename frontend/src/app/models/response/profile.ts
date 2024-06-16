import { Gender } from "./gender";
import { Preferences } from "./preferences";

export interface Profile {

  id: number;
  preferences: Preferences;
  username: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: Date;
  email: string;
  phoneNumber?: string;
}
