import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { Theme } from "../../../models/response/preferences";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  readonly THEME_KEY: string = 'theme';
  readonly DEFAULT: Theme = Theme.LIGHT;

  constructor(private cookieService: CookieService) {}

  public setPrefOrDefault() {
    let theme: Theme;
    if (this.checkExists()) {
      theme = this.getCookie();
    } else {
      theme = this.DEFAULT;
      this.setCookie(theme);
    }

    this.setActive(theme);
  }

  public set(theme: Theme) {
    this.setCookie(theme);
    this.setActive(theme);
  }

  public setActive(theme: Theme) {
    for (let posTheme of Object.values(Theme)) {
      document.body.classList.remove(posTheme);
    }

    document.body.classList.add(theme);
  }

  public getCookie() {
    return this.cookieService.get(this.THEME_KEY) as Theme;
  }

  public setCookie(theme: Theme) {
    this.cookieService.set(this.THEME_KEY, theme);
  }

  public checkExists() {
    return this.cookieService.check(this.THEME_KEY);
  }

  public check(theme: Theme) {
    return this.checkExists() && this.getCookie() === theme;
  }
}
