import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatCard, MatCardContent } from "@angular/material/card";
import { TranslocoPipe } from "@ngneat/transloco";
import { MatError, MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { BaseFormComponent } from "../util/base-form-component";
import { ProgressSpinnerComponent } from "../progress-spinner/progress-spinner.component";
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatOption, MatSelect } from "@angular/material/select";
import { Gender } from "../../models/response/gender";
import { Profile } from "../../models/response/profile";
import { ProfileService } from "../../services/profile/profile.service";
import { ErrorCode, ErrorResponse } from "../../models/error/error-response";
import { handle, parseErrorResponse } from "../../error/error-utils";
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from "ngx-intl-tel-input-gg";

@Component({
  selector: 'app-create-account-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatCard,
    MatCardContent,
    TranslocoPipe,
    MatFormField,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatIcon,
    ProgressSpinnerComponent,
    MatButton,
    MatInput,
    MatDialogTitle,
    NgIf,
    MatSuffix,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSelect,
    MatOption,
    NgxIntlTelInputModule
  ],
  templateUrl: './create-account-dialog.component.html',
  styleUrl: './create-account-dialog.component.scss'
})
export class CreateAccountDialogComponent extends BaseFormComponent {

  constructor(public dialogRef: MatDialogRef<CreateAccountDialogComponent>,
              private profileService: ProfileService) {
    super(
      new FormGroup({
        firstName: new FormControl(
          '',
          [
            Validators.required
          ]
        ),
        lastName: new FormControl(
          '',
          [
            Validators.required
          ]
        ),
        gender: new FormControl(
          '',
          [
            Validators.required
          ]
        ),
        birthDate: new FormControl(
          '',
          [
            Validators.required
          ]
        ),
        email: new FormControl(
          '',
          [
            Validators.required,
            Validators.email
          ]
        ),
        phoneNumber: new FormControl(
          '',
          [

          ]
        )
      })
    );
  }

  public createAccount() {
    if (this.form.valid) {
      const profile: Profile = this.form.getRawValue() as Profile;
      this.spinner = true;
      this.profileService.create(profile)
        .then((value: Profile) => {
          this.dialogRef.close(value);
        }).catch(error => {
          const errorResponse: ErrorResponse = parseErrorResponse(error);
          console.log(errorResponse);
          if (errorResponse.errorCode == ErrorCode.VALIDATION_ERROR) {
            this.putErrors(errorResponse);
          } else {
            handle(errorResponse);
          }
        }).finally(() => {
          this.spinner = false;
        });
    }
  }

  protected readonly Gender = Gender;
  protected readonly CountryISO = CountryISO;
  protected readonly SearchCountryField = SearchCountryField;
}
