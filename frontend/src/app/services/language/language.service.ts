import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { TranslocoService } from "@ngneat/transloco";
import { Language } from "../../models/response/preferences";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  readonly LANGUAGE_KEY: string = "language";

  constructor(private cookieService: CookieService,
              private transloco: TranslocoService) {}

  public set(language: Language) {
    this.cookieService.set(this.LANGUAGE_KEY, language.toLowerCase());
    this.transloco.setActiveLang(language.toLowerCase());
  }

  public get() {
    return this.cookieService.get(this.LANGUAGE_KEY);
  }

  public check(language: Language): boolean {
    return this.checkExists() && this.get() == language.toLowerCase();
  }

  private checkExists() {
    return this.cookieService.check(this.LANGUAGE_KEY);
  }
}
