import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { TranslocoService } from "@ngneat/transloco";
import { Language } from "../../../models/response/preferences";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  readonly LANGUAGE_KEY: string = 'language';
  readonly DEFAULT: Language = Language.EN;

  constructor(private cookieService: CookieService,
              private transloco: TranslocoService) {}

  public setPrefOrDefault() {
    let language: Language;
    if (this.checkExists()) {
      language = this.getCookie();
    } else {
      language = this.DEFAULT;
      this.setCookie(language);
    }

    this.setActive(language);
  }

  public set(language: Language) {
    this.setCookie(language);
    this.setActive(language);
  }

  public setActive(language: Language) {
    this.transloco.setActiveLang(language);
  }

  public setCookie(language: Language) {
    this.cookieService.set(this.LANGUAGE_KEY, language);
  }

  public getCookie() {
    return this.cookieService.get(this.LANGUAGE_KEY) as Language;
  }

  public check(language: Language): boolean {
    return this.checkExists() && this.getCookie() == language;
  }

  private checkExists() {
    return this.cookieService.check(this.LANGUAGE_KEY);
  }
}
