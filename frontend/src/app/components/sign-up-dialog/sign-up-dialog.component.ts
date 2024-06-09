import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { AuthService } from "../../services/auth/auth.service";
import { AuthRequest } from "../../models/request/auth-request";
import { ErrorCode, ErrorResponse } from "../../models/response/error-response";
import { getError, handle, parseErrorResponse, putErrors } from "../../error/error-utils";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatError, MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { ProgressSpinnerComponent } from "../progress-spinner/progress-spinner.component";
import { TranslocoPipe } from "@ngneat/transloco";
import { AuthDialogResponse } from "../../models/dialog/auth-dialog-response";

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
export class SignUpDialogComponent {
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
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<SignUpDialogComponent>,
              private authService: AuthService,
              private cdr: ChangeDetectorRef) {
    this.hidePassword = true;
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
          putErrors(this.cdr, this.form, errorResponse);
        } else {
          handle(errorResponse);
        }
      }).finally(() => {
        this.spinner = false;
      });
    }
  }

  protected readonly getError = getError;
}
