import { environment } from "../../environments/environment.development";
import { CookieService } from "ngx-cookie-service";
import { inject, Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class Service {

  public readonly API_URL: string = environment.apiUrl;

  private cookieService: CookieService = inject(CookieService);
  private readonly TOKEN_KEY: string = 'token';

  public checkToken(): boolean {
    return this.cookieService.check(this.TOKEN_KEY);
  }

  public getToken(): string {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  public setToken(token: string) {
    this.cookieService.set(this.TOKEN_KEY, token, {secure: true});
  }

  public deleteToken() {
    this.cookieService.delete(this.TOKEN_KEY);
  }

  public getHeaders(): any {
    return {
      'Authorization': 'Bearer ' + this.getToken()
    };
  }
}
