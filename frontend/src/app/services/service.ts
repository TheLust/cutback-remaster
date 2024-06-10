import { environment } from "../../environments/environment.development";

export class Service {
  readonly API_URL: string = environment.apiUrl;
  readonly TOKEN_KEY: string = "token";
}
