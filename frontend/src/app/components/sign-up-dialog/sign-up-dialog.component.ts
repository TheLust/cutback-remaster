import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { AuthService } from "../../services/auth/auth.service";
import { AuthRequest } from "../../models/request/auth-request";
import { ErrorCode, ErrorResponse } from "../../models/response/error-response";
import { handle, parseErrorResponse } from "../../error/error-utils";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatError, MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { ProgressSpinnerComponent } from "../progress-spinner/progress-spinner.component";
import { TranslocoPipe, TranslocoService } from "@ngneat/transloco";
import { AuthDialogResponse } from "../../models/dialog/auth-dialog-response";
import { BaseFormComponent } from "../util/base-form-component";

@Component({
  selector: 'app-sign-up-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    MatError,
    NgIf,
    ProgressSpinnerComponent,
    ReactiveFormsModule,
    TranslocoPipe
  ],
  templateUrl: './sign-up-dialog.component.html',
  styleUrl: './sign-up-dialog.component.scss'
})
export class SignUpDialogComponent extends BaseFormComponent{
  hidePassword: boolean;

  constructor(public dialogRef: MatDialogRef<SignUpDialogComponent>,
              private translocoService: TranslocoService,
              private authService: AuthService) {
    super(
      translocoService,
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
  }

  public signIn() {
    this.dialogRef.close(<AuthDialogResponse>{
      redirect: true
    });
  }

  public signUp() {
    if (this.form.valid) {
      const authRequest: AuthRequest = this.form.getRawValue() as AuthRequest;
      this.spinner = true;
      this.authService.register(authRequest)
        .then(token => {
          this.dialogRef.close(<AuthDialogResponse>{
            redirect: false,
            token: token
          });
        }).catch(error => {
        const errorResponse: ErrorResponse = parseErrorResponse(error);
        if (errorResponse.errorCode == ErrorCode.VALIDATION_ERROR) {
          this.putErrors(this.form, errorResponse);
        } else {
          handle(errorResponse);
        }
      }).finally(() => {
        this.spinner = false;
      });
    }
  }
}
