import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { HeaderComponent } from "./components/header/header.component";
import { Profile } from "./models/response/profile";
import { ProfileService } from "./services/profile/profile.service";
import { ErrorCode, ErrorResponse } from "./models/error/error-response";
import { MatDialog } from "@angular/material/dialog";
import { CreateAccountDialogComponent } from "./components/create-account-dialog/create-account-dialog.component";
import { PreferencesService } from "./services/preferences/preferences.service";
import { toProfile } from "./models/mapper/model-mapper";
import { ErrorService } from "./services/error/error.service";
import { MatMenuItem } from "@angular/material/menu";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    HeaderComponent,
    MatMenuItem,
    MatIcon
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  profile: Profile | undefined;

  constructor(private profileService: ProfileService,
              private preferencesService: PreferencesService,
              private errorService: ErrorService,
              private router: Router,
              private dialog: MatDialog) {
    this.preferencesService.setPreferences(this.profile);
    this.setUp();
  }

  public navigateTo(location: string): Promise<boolean> {
    return this.router.navigate([location]);
  }

  private setUp() {
    if (this.profileService.checkToken()) {
      this.profileService.get()
        .then(value => {
          this.profile = toProfile(value);
        }).catch(error => {
          const errorResponse: ErrorResponse = this.errorService.parseErrorResponse(error);
          if (errorResponse.errorCode == ErrorCode.USER_WO_ACCOUNT) {
            this.createAccountForUser();
          } else {
            this.errorService.handle(errorResponse);
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
