import { Component, Input } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatSidenav } from "@angular/material/sidenav";
import { NgIf } from "@angular/common";
import { TranslocoPipe } from "@ngneat/transloco";
import { MatDialog } from "@angular/material/dialog";
import { SignInDialogComponent } from "../sign-in-dialog/sign-in-dialog.component";
import { AuthDialogResponse } from "../../models/dialog/auth-dialog-response";
import { SignUpDialogComponent } from "../sign-up-dialog/sign-up-dialog.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatIconButton,
    MatIcon,
    NgIf,
    TranslocoPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input("sidenav") sidenav: MatSidenav | undefined;
  @Input("profile") profile: any | undefined;

  constructor(private dialog: MatDialog) {}

  public toggleSidenav(): void {
    if (this.sidenav) {
      this.sidenav.toggle().then(() => {});
    }
  }

  private register() {
    const dialogRef = this.dialog.open(SignUpDialogComponent);

    dialogRef.afterClosed()
      .subscribe((authDialogResponse: AuthDialogResponse) => {
        if (authDialogResponse) {
          if (authDialogResponse.redirect) {
            this.login();
          } else {
            console.log(authDialogResponse.token);
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
            console.log(authDialogResponse.token);
          }
        }
      });
  }
}
