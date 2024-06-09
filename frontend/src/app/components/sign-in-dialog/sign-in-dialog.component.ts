import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormField, MatInput, MatLabel, MatPrefix, MatSuffix } from "@angular/material/input";
import { AuthService } from "../../services/auth/auth.service";
import { TranslocoPipe } from "@ngneat/transloco";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton } from "@angular/material/button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthRequest } from "../../models/request/auth-request";
import { ErrorCode, ErrorResponse } from "../../models/response/error-response";
import { handle, parseErrorResponse } from "../../error/error-utils";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { NgIf } from "@angular/common";
import { MatCard, MatCardContent } from "@angular/material/card";
import { ProgressSpinnerComponent } from "../progress-spinner/progress-spinner.component";
import { AuthDialogResponse } from "../../models/dialog/auth-dialog-response";

@Component({
  selector: 'app-sign-in-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    MatLabel,
    MatInput,
    TranslocoPipe,
    MatIcon,
    MatSuffix,
    MatIconButton,
    MatPrefix,
    MatButton,
    MatDialogTitle,
    ReactiveFormsModule,
    MatProgressSpinner,
    NgIf,
    MatCard,
    MatCardContent,
    ProgressSpinnerComponent
  ],
  templateUrl: './sign-in-dialog.component.html',
  styleUrl: './sign-in-dialog.component.scss'
})
export class SignInDialogComponent {

  private _spinner: boolean = false;
  private set spinner(spinner: boolean) {
    this._spinner = spinner;
    this.dialogRef.disableClose = spinner;
    if (spinner) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public get spinner() {
    return this._spinner;
  }

  hidePassword: boolean;
  badCredentials: boolean;
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<SignInDialogComponent>,
              private authService: AuthService) {
    this.hidePassword = true;
    this.badCredentials = false;
    this.form = new FormGroup({
      username: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      password: new FormControl(
        '',
        [
          Validators.required
        ]
      )
    });
  }

  public signUp() {
    this.dialogRef.close(<AuthDialogResponse>{
      redirect: true
    });
  }

  public signIn() {
    if (this.form.valid) {
      const authRequest: AuthRequest = this.form.getRawValue() as AuthRequest;
      this.spinner = true;
      this.authService.login(authRequest)
        .then(token => {
          this.dialogRef.close(<AuthDialogResponse>{
            redirect: false,
            token: token
          });
        }).catch(error => {
        const errorResponse: ErrorResponse = parseErrorResponse(error);
        if (errorResponse.errorCode == ErrorCode.BAD_CREDENTIALS) {
          this.badCredentials = true;
        } else {
          handle(errorResponse);
        }
      }).finally(() => this.spinner = false);
    }
  }
}
