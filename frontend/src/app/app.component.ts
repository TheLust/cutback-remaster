import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { HeaderComponent } from "./components/header/header.component";
import { Profile } from "./models/response/profile";
import { ProfileService } from "./services/profile/profile.service";
import { handle, parseErrorResponse } from "./error/error-utils";
import { ErrorCode, ErrorResponse } from "./models/error/error-response";
import { MatDialog } from "@angular/material/dialog";
import { CreateAccountDialogComponent } from "./components/create-account-dialog/create-account-dialog.component";
import { LanguageService } from "./services/preferences/language/language.service";
import { ThemeService } from "./services/preferences/theme/theme.service";
import { Preferences } from "./models/response/preferences";
import { PreferencesService } from "./services/preferences/preferences.service";
import { toProfile } from "./models/mapper/model-mapper";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  profile: Profile | undefined;

  constructor(private profileService: ProfileService,
              private preferencesService: PreferencesService,
              private dialog: MatDialog) {
    this.preferencesService.setPreferences(this.profile);
    this.setUp();
  }

  private setUp() {
    if (this.profileService.checkToken()) {
      this.profileService.get()
        .then(value => {
          this.profile = toProfile(value);
        }).catch(error => {
          const errorResponse: ErrorResponse = parseErrorResponse(error);
          if (errorResponse.errorCode == ErrorCode.USER_WO_ACCOUNT) {
            this.createAccountForUser();
          } else {
            handle(errorResponse);
          }
        }).finally(() => {
        this.preferencesService.setPreferences(this.profile);
      });
    }
  }

  private createAccountForUser() {
    const dialogRef = this.dialog.open(
      CreateAccountDialogComponent,
      {
        disableClose: true
      }
    );

    dialogRef.afterClosed()
      .subscribe(value => {
        if (!value) {
          this.createAccountForUser();
        } else {
          this.profile = value;
        }
      });
  }
}
