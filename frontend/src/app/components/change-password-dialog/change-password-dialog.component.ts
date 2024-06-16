import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { BaseFormComponent } from "../util/base-form-component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatError, MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { NgIf } from "@angular/common";
import { NgxMatInputTelComponent } from "ngx-mat-input-tel";
import { TranslocoPipe } from "@ngneat/transloco";
import { Profile } from "../../models/response/profile";
import { ErrorCode, ErrorResponse } from "../../models/error/error-response";
import { ProfileService } from "../../services/profile/profile.service";
import { ChangePasswordRequest } from "../../models/request/change-password-request";
import { ErrorService } from "../../services/error/error.service";

@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    NgIf,
    NgxMatInputTelComponent,
    ReactiveFormsModule,
    TranslocoPipe,
    MatIconButton
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss'
})
export class ChangePasswordDialogComponent extends BaseFormComponent {

  hideCurrentPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmNewPassword: boolean = true;

  constructor(private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
              private profileService: ProfileService,
              private errorService: ErrorService) {
    super(
      new FormGroup({
        currentPassword: new FormControl(
          '',
          [
            Validators.required
          ]
        ),
        newPassword: new FormControl(
          '',
          [
            Validators.required
          ]
        ),
        confirmNewPassword: new FormControl(
          '',
          [
            Validators.required
          ]
        )
      })
    );
  }

  public cancel() {
    this.dialogRef.close();
  }

  public submit() {
    if (this.form.valid) {
      const changePasswordRequest: ChangePasswordRequest = this.form.getRawValue() as ChangePasswordRequest;
      this.spinner = true;
      this.profileService.changePassword(changePasswordRequest)
        .then((token: string) => {
          this.dialogRef.close(token);
        }).catch(error => {
        const errorResponse: ErrorResponse = this.errorService.parseErrorResponse(error);
        console.log(errorResponse);
        if (errorResponse.errorCode == ErrorCode.VALIDATION_ERROR) {
          this.putErrors(errorResponse);
        } else {
          this.errorService.handle(errorResponse);
        }
      }).finally(() => {
        this.spinner = false;
      });
    }
  }
}
