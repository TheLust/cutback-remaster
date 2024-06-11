import { Gender } from "./gender";

export interface Profile {

  id: number;
  username: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: Date;
  email: string;
  phoneNumber: string;
}
