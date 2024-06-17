import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormField, MatInput, MatLabel, MatPrefix, MatSuffix } from "@angular/material/input";
import { AuthService } from "../../../services/auth/auth.service";
import { TranslocoPipe } from "@ngneat/transloco";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton } from "@angular/material/button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthRequest } from "../../../models/request/auth-request";
import { ErrorCode, ErrorResponse } from "../../../models/error/error-response";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { NgIf } from "@angular/common";
import { MatCard, MatCardContent } from "@angular/material/card";
import { AuthDialogResponse } from "../../../models/dialog/auth-dialog-response";
import { BaseFormComponent } from "../../util/base-form-component";
import { MatError } from "@angular/material/form-field";
import { ErrorService } from "../../../services/error/error.service";

@Component({
  selector: 'app-sign-in-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
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
    MatCardContent
  ],
  templateUrl: './sign-in-dialog.component.html',
  styleUrl: './sign-in-dialog.component.scss'
})
export class SignInDialogComponent extends BaseFormComponent{

  hidePassword: boolean;
  badCredentials: boolean;

  constructor(private dialogRef: MatDialogRef<SignInDialogComponent>,
              private authService: AuthService,
              private errorService: ErrorService) {
    super(
      new FormGroup({
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
      })
    );
    this.hidePassword = true;
    this.badCredentials = false;
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
          const errorResponse: ErrorResponse = this.errorService.parseErrorResponse(error);
          if (ErrorCode.BAD_CREDENTIALS === errorResponse.errorCode) {
            this.badCredentials = true;
          } else {
            this.errorService.handle(errorResponse);
          }
      }).finally(() => this.spinner = false);
    }
  }
}
