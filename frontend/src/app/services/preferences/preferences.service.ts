import { Injectable } from '@angular/core';
import { LanguageService } from "./language/language.service";
import { ThemeService } from "./theme/theme.service";
import { Language, Preferences, Theme } from "../../models/response/preferences";
import { Profile } from "../../models/response/profile";
import { Service } from "../service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { NotificationService } from "../notification/notification.service";

@Injectable({
  providedIn: 'root'
})
export class PreferencesService extends Service {

  readonly PREFERENCES_URL: string = this.API_URL + 'profile/preferences';

  constructor(private languageService: LanguageService,
              private themeService: ThemeService,
              private notificationService: NotificationService,
              private http: HttpClient) {
    super();
  }

  public setPreferences(profile?: Profile) {
    if (profile) {
      const preferences: Preferences = profile.preferences;
      let cookieLang: Language = this.languageService.getCookie();
      let cookieTheme: Theme = this.themeService.getCookie();

      cookieLang = Language[cookieLang.toString() as keyof typeof Language];
      cookieTheme = Theme[cookieTheme.toString() as keyof typeof Theme];

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
    if (this.checkToken()) {
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
      }).catch(() => {
        this.notificationService.fireErrorNotification('error.updatePreferences');
      });
    }
    this.languageService.set(language);
  }

  public setTheme(theme: Theme) {
    if (this.checkToken()) {
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
      }).catch(() => {
        this.notificationService.fireErrorNotification('error.updatePreferences');
      });
    }
    this.themeService.set(theme);
  }

  public checkLanguage(language: Language): boolean {
    return this.languageService.check(language);
  }

  public checkTheme(theme: Theme): boolean {
    return this.themeService.check(theme);
  }

  public getLanguage() {
    return this.languageService.getCookie();
  }

  public getTheme() {
    return this.themeService.getCookie();
  }
}
