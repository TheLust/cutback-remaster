import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatSidenav } from "@angular/material/sidenav";
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { TranslocoPipe } from "@ngneat/transloco";
import { MatDialog } from "@angular/material/dialog";
import { SignInDialogComponent } from "../sign-in-dialog/sign-in-dialog.component";
import { AuthDialogResponse } from "../../models/dialog/auth-dialog-response";
import { SignUpDialogComponent } from "../sign-up-dialog/sign-up-dialog.component";
import { MatDivider } from "@angular/material/divider";
import { Profile } from "../../models/response/profile";
import { ProfileService } from "../../services/profile/profile.service";
import { ErrorCode, ErrorResponse } from "../../models/error/error-response";
import { CreateAccountDialogComponent } from "../create-account-dialog/create-account-dialog.component";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatOption, MatSelect } from "@angular/material/select";
import { Language, Theme } from "../../models/response/preferences";
import { PreferencesService } from "../../services/preferences/preferences.service";
import { toProfile } from "../../models/mapper/model-mapper";
import { DialogService } from "../../services/dialog/dialog.service";
import { Router } from "@angular/router";
import { ErrorService } from "../../services/error/error.service";

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
    MatOption,
    NgForOf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Output() profileChange: EventEmitter<Profile>;
  @Input() profile: Profile | undefined;
  @Input() sidenav: MatSidenav | undefined;

  readonly languages: Language[] = Object.values(Language);
  readonly themes: Theme[] = Object.values(Theme);

  constructor(public preferencesService: PreferencesService,
              private router: Router,
              private profileService: ProfileService,
              private dialogService: DialogService,
              private errorService: ErrorService,
              private dialog: MatDialog) {
    this.profileChange = new EventEmitter<Profile>;
  }

  public toggleSidenav(): void {
    if (this.sidenav) {
      this.sidenav.toggle().then(() => {});
    }
  }

  public register() {
    const dialogRef = this.dialog.open(
      SignUpDialogComponent,
      {
        panelClass: ['small-dialog']
      }
    );

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
    const dialogRef = this.dialog.open(
      SignInDialogComponent,
      {
        panelClass: ['small-dialog']
      }
    );

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

  public toProfilePage() {
    this.router.navigate(['profile']).then();
  }

  public signOut() {
    this.dialogService.confirm('signOut')
      .then(result => {
        if (result) {
          this.profileService.deleteToken();
          this.profileChange.emit(undefined);
        }
      });
  }

  private setTokenAndChangeProfile(token: string) {
    let profile: Profile | undefined;
    this.profileService.setToken(token);
    this.profileService.get()
      .then((value: Profile) => {
        profile = toProfile(value);
        this.profileChange.emit(profile);
      }).catch(error => {
        const errorResponse: ErrorResponse = this.errorService.parseErrorResponse(error);
        if (errorResponse.errorCode == ErrorCode.USER_WO_ACCOUNT) {
          this.createAccountForUser()
        } else {
          this.errorService.handle(errorResponse);
        }
      }).finally(() => {
        this.preferencesService.setPreferences(profile);
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
}
