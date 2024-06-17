import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatCard, MatCardAvatar, MatCardContent } from "@angular/material/card";
import { TranslocoPipe } from "@ngneat/transloco";
import { MatError, MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { BaseFormComponent } from "../../util/base-form-component";
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatOption, MatSelect } from "@angular/material/select";
import { Gender } from "../../../models/response/gender";
import { Profile } from "../../../models/response/profile";
import { ProfileService } from "../../../services/profile/profile.service";
import { ErrorCode, ErrorResponse } from "../../../models/error/error-response";
import { NgxMatInputTelComponent } from "ngx-mat-input-tel";
import { CustomValidators } from "../../util/custom-validators";
import { ErrorService } from "../../../services/error/error.service";
import { PreferencesService } from "../../../services/preferences/preferences.service";
import { Preferences } from "../../../models/response/preferences";
import { AvatarComponent } from "../../avatar/avatar.component";
import { NotificationService } from "../../../services/notification/notification.service";

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
        NgxMatInputTelComponent,
        MatCardAvatar,
        AvatarComponent
    ],
  templateUrl: './create-account-dialog.component.html',
  styleUrl: './create-account-dialog.component.scss'
})
export class CreateAccountDialogComponent extends BaseFormComponent {

  imageBlob: File | undefined;

  constructor(private dialogRef: MatDialogRef<CreateAccountDialogComponent>,
              private profileService: ProfileService,
              private preferencesService: PreferencesService,
              private notificationService: NotificationService,
              private errorService: ErrorService) {
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
            Validators.required,
            CustomValidators.past
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
          []
        )
      })
    );
  }

  public createAccount() {
    if (this.form.valid) {
      const profile: Profile = this.form.getRawValue() as Profile;
      profile.preferences = {
        language: this.preferencesService.getLanguage().toUpperCase(),
        theme: this.preferencesService.getTheme().toUpperCase()
      } as Preferences;
      this.spinner = true;
      this.profileService.create(profile)
        .then((value: Profile) => {
          if (this.imageBlob) {
            this.profileService.changeImage(this.imageBlob)
              .then(profile => {
                this.dialogRef.close(profile);
              }).catch(error => {
                this.notificationService.fireErrorNotification('error.setImage');
                this.errorService.handleError(error);
                this.dialogRef.close(value);
              }).finally(() => {
                this.spinner = false;
              });
          } else {
              this.dialogRef.close(value);
          }
        }).catch(error => {
          const errorResponse: ErrorResponse = this.errorService.parseErrorResponse(error);
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

  public cancel() {
    this.dialogRef.close();
  }

  public isGender(gender: Gender): boolean {
    if (this.form) {
      const control: AbstractControl | null = this.form.get('gender');
      if (control) {
        if (<Gender> control.getRawValue() == gender) {
          return true;
        }
      }
    }

    return false;
  }

  protected readonly Gender = Gender;
}
