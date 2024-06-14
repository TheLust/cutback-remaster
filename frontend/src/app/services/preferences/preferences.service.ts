import { Injectable } from '@angular/core';
import { LanguageService } from "./language/language.service";
import { ThemeService } from "./theme/theme.service";
import { Language, Preferences, Theme } from "../../models/response/preferences";
import { Profile } from "../../models/response/profile";
import { Service } from "../service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { fireNonFatalError } from "../../components/util/alert-utils";
import { translate } from "@ngneat/transloco";

@Injectable({
  providedIn: 'root'
})
export class PreferencesService extends Service {

  readonly PREFERENCES_URL: string = this.API_URL + 'profile/preferences';

  constructor(private languageService: LanguageService,
              private themeService: ThemeService,
              private http: HttpClient) {
    super();
  }

  public setPreferences(profile?: Profile) {
    if (profile) {
      const preferences: Preferences = profile.preferences;
      const cookieLang: Language = this.languageService.getCookie();
      const cookieTheme: Theme = this.themeService.getCookie();

      if (!cookieLang || cookieLang !== preferences.language) {
        this.languageService.set(preferences.language);
      }

      if (!cookieTheme || cookieTheme !== preferences.theme) {
        this.themeService.set(preferences.theme);
      }
    } else {
      this.languageService.setPrefOrDefault();
      this.themeService.setPrefOrDefault();
    }
  }

  public setLanguage(language: Language) {
    lastValueFrom(
      this.http.put(
        this.PREFERENCES_URL,
        {
          language: language.toUpperCase(),
          theme: this.themeService.getCookie().toUpperCase()
        } as Preferences,
        {
          responseType: 'text',
          headers: this.getHeaders()
        }
      )
    ).then(() => {
      console.log("updated");
    }).catch(error => {
      // fireNonFatalError(translate('error.updatePreferences')).then();//TODO: fire error dialog notification
      console.log('error');
      console.log(error)
    });
    this.languageService.set(language);
  }

  public setTheme(theme: Theme) {
    lastValueFrom(
      this.http.put(
        this.PREFERENCES_URL,
        {
          language: this.languageService.getCookie().toUpperCase(),
          theme: theme.toUpperCase()
        } as Preferences,
        {
          responseType: 'text',
          headers: this.getHeaders()
        }
      )
    ).then(() => {
      console.log("updated");
    }).catch(error => {
      // fireNonFatalError(translate('error.updatePreferences')).then();//TODO: fire error dialog notification
      console.log('error');
      console.log(error)
    });
    this.themeService.set(theme);
  }

  public checkLanguage(language: Language): boolean {
    return this.languageService.check(language);
  }

  public checkTheme(theme: Theme): boolean {
    return this.themeService.check(theme);
  }
}
