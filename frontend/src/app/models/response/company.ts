import { Image } from "./image";

export interface Company {
  id: number;
  image: Image;
  name: string;
  enabled: boolean;
}
