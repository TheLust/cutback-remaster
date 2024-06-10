import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import { lastValueFrom, Observable } from "rxjs";
import { AuthRequest } from "../../models/request/auth-request";
import { CutbackError } from "../../error/cutback-error";
import { ErrorResponse } from "../../models/response/error-response";
import { Service } from "../service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Service {

  readonly AUTH_URL = this.API_URL + 'auth/';

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService) {
    super();
  }

  public isAuthenticated(): boolean {
    return this.cookieService.check(this.TOKEN_KEY);
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
