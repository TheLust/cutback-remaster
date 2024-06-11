import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { AuthRequest } from "../../models/request/auth-request";
import { Service } from "../service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Service {

  readonly AUTH_URL = this.API_URL + 'auth/';

  constructor(private httpClient: HttpClient) {
    super();
  }

  public login(request: AuthRequest): Promise<string> {
      return lastValueFrom(
        this.httpClient.post(
          this.AUTH_URL + 'login',
          request,
          {
            responseType: 'text'
          }
        )
      );
  }

    public register(request: AuthRequest): Promise<string> {
        return lastValueFrom(
            this.httpClient.post(
                this.AUTH_URL + 'register',
                request,
                {
                    responseType: 'text'
                }
            )
        );
    }
}
