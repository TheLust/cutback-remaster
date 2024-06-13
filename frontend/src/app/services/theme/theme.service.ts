import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { Theme } from "../../models/response/preferences";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  readonly THEME_KEY: string = 'theme';

  constructor(private cookieService: CookieService) {}

  public get() {
    return this.cookieService.get(this.THEME_KEY);
  }

  public set(theme: Theme) {
    return this.cookieService.set(this.THEME_KEY, theme.toLowerCase());
  }

  public checkExists() {
    return this.cookieService.check(this.THEME_KEY);
  }

  public check(theme: Theme) {
    return this.checkExists() && this.get() === theme.toLowerCase();
  }
}
