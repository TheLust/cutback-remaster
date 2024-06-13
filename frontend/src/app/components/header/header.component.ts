import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatSidenav } from "@angular/material/sidenav";
import { NgIf, NgOptimizedImage } from "@angular/common";
import { translate, TranslocoPipe } from "@ngneat/transloco";
import { MatDialog } from "@angular/material/dialog";
import { SignInDialogComponent } from "../sign-in-dialog/sign-in-dialog.component";
import { AuthDialogResponse } from "../../models/dialog/auth-dialog-response";
import { SignUpDialogComponent } from "../sign-up-dialog/sign-up-dialog.component";
import { MatDivider } from "@angular/material/divider";
import { Profile } from "../../models/response/profile";
import { ProfileService } from "../../services/profile/profile.service";
import { ErrorCode, ErrorResponse } from "../../models/error/error-response";
import { handle, parseErrorResponse } from "../../error/error-utils";
import { CreateAccountDialogComponent } from "../create-account-dialog/create-account-dialog.component";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatOption, MatSelect } from "@angular/material/select";
import { fireConfirmDialog } from "../util/alert-utils";
import { LanguageService } from "../../services/language/language.service";
import { Language, Theme } from "../../models/response/preferences";
import { ThemeService } from "../../services/theme/theme.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatIconButton,
    MatIcon,
    NgIf,
    TranslocoPipe,
    MatDivider,
    NgOptimizedImage,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatSelect,
    MatOption
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Output() profileChange: EventEmitter<Profile>;
  @Input() profile: Profile | undefined;
  @Input() sidenav: MatSidenav | undefined;

  constructor(public languageService: LanguageService,
              public themeService: ThemeService,
              private profileService: ProfileService,
              private dialog: MatDialog) {
    this.profileChange = new EventEmitter<Profile>;
  }

  public toggleSidenav(): void {
    if (this.sidenav) {
      this.sidenav.toggle().then(() => {});
    }
  }

  public register() {
    const dialogRef = this.dialog.open(SignUpDialogComponent);

    dialogRef.afterClosed()
      .subscribe((authDialogResponse: AuthDialogResponse) => {
        if (authDialogResponse) {
          if (authDialogResponse.redirect) {
            this.login();
          } else {
            this.setTokenAndChangeProfile(authDialogResponse.token);
          }
        }
      });
  }

  public login() {
    const dialogRef = this.dialog.open(SignInDialogComponent);

    dialogRef.afterClosed()
      .subscribe((authDialogResponse: AuthDialogResponse) => {
        if (authDialogResponse) {
          if (authDialogResponse.redirect) {
            this.register();
          } else {
            this.setTokenAndChangeProfile(authDialogResponse.token);
          }
        }
      });
  }

  public signOut() {
    fireConfirmDialog(
      translate('alert.exit'),
      translate('alert.signOutWarning'),
      translate('alert.cancel'),
      translate('auth.signOut')
    ).then(result => {
      if (result.isConfirmed) {
        this.profileService.deleteToken();
        this.profileChange.emit(undefined);
      }
    });
  }

  private setTokenAndChangeProfile(token: string) {
    this.profileService.setToken(token);
    this.profileService.get()
      .then((value: Profile) => {
        this.profileChange.emit(value);
      })
      .catch(error => {
        const errorResponse: ErrorResponse = parseErrorResponse(error);
        if (errorResponse.errorCode == ErrorCode.USER_WO_ACCOUNT) {
          this.createAccountForUser()
        } else {
          handle(errorResponse);
        }
      });
  }

  private createAccountForUser() {
    const dialogRef = this.dialog.open(CreateAccountDialogComponent);

    dialogRef.afterClosed()
      .subscribe(value => {
        if (!value) {
          this.createAccountForUser();
        } else {
          this.profileChange.emit(value);
        }
      });
  }

  protected readonly Language = Language;
  protected readonly Theme = Theme;
}
