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

  constructor(profileService: ProfileService,
              private dialog: MatDialog) {
    if (profileService.checkToken()) {
      profileService.get()
        .then((value: Profile) => {
          this.profile = value;
        })
        .catch(error => {
          const errorResponse: ErrorResponse = parseErrorResponse(error);
          if (errorResponse.errorCode == ErrorCode.USER_WO_ACCOUNT) {
            this.createAccountForUser();
          } else {
            handle(errorResponse);
          }
        });
    }
  }

  private createAccountForUser() {
    const dialogRef = this.dialog.open(CreateAccountDialogComponent);

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
