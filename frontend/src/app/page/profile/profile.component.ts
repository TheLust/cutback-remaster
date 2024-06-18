import { Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import { BaseFormComponent } from "../../components/util/base-form-component";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CustomValidators } from "../../components/util/custom-validators";
import { ProfileService } from "../../services/profile/profile.service";
import { Gender } from "../../models/response/gender";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatError, MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatOption, MatSelect } from "@angular/material/select";
import { NgForOf, NgIf } from "@angular/common";
import { NgxMatInputTelComponent } from "ngx-mat-input-tel";
import { TranslocoPipe } from "@ngneat/transloco";
import { toProfile } from "../../models/mapper/model-mapper";
import { ErrorCode, ErrorResponse } from "../../models/error/error-response";
import { Profile } from "../../models/response/profile";
import { Language, Theme } from "../../models/response/preferences";
import { MatButton } from "@angular/material/button";
import {
  ChangePasswordDialogComponent
} from "../../components/dialog/change-password-dialog/change-password-dialog.component";
import { lastValueFrom } from "rxjs";
import { ErrorService } from "../../services/error/error.service";
import { AvatarComponent } from "../../components/avatar/avatar.component";
import { NotificationService } from "../../services/notification/notification.service";
import { Size } from "../../models/request/size";
import { LanguageService } from "../../services/preferences/language/language.service";
import { ThemeService } from "../../services/preferences/theme/theme.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    FormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
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
    NgForOf,
    MatCardActions,
    MatButton,
    AvatarComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent extends BaseFormComponent {

  image: File | undefined;
  profile: Profile | undefined;

  readonly languages: Language[] = Object.values(Language);
  readonly themes: Theme[] = Object.values(Theme);

  private _edit: boolean = false;

  get edit(): boolean {
    return this._edit;
  }

  set edit(edit: boolean) {
    if (edit) {
      this.form.enable();
    } else {
      this.setForm(this.profile ? this.profile : {} as Profile);
      setTimeout(() => {
        this.form.disable();
      }, 50);
    }
    this._edit = edit;
  }

  constructor(private profileService: ProfileService,
              private languageService: LanguageService,
              private themeService: ThemeService,
              private notificationService: NotificationService,
              private errorService: ErrorService) {
    super(
      new FormGroup({
        username: new FormControl(
          '',
          [
            Validators.required
          ]
        ),
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
        ),
        language: new FormControl(
          '',
          [
            Validators.required
          ]
        ),
        theme: new FormControl(
          '',
          [
            Validators.required
          ]
        )
      })
    );

    this.spinner = true;
    this.profileService.get()
      .then(value => {
        this.profile = toProfile(value);
        this.setForm(this.profile);
      }).catch(error => {
      const errorResponse: ErrorResponse = this.errorService.parseErrorResponse(error);
      this.errorService.handle(errorResponse);
    }).finally(() => {
      this.spinner = false;
      this.form.disable();
    });

    this.profileService.getImage(Size.ORIGINAL)
      .then(image => {
        this.image = new File([image], '');
      }).catch(error => {
      const errorResponse: ErrorResponse = this.errorService.parseErrorResponse(error);
      this.errorService.handle(errorResponse);
    });
  }

  public imageChange() {
    if (this.image) {
      this.spinner = true;
      this.profileService.changeImage(this.image)
        .then(() => {
          this.profileService.getImage(Size.ORIGINAL)
            .then(image => {
              this.image = new File([image], '');
              this.profileService.reloadImage.next(true);
            }).catch(error => {
            const errorResponse: ErrorResponse = this.errorService.parseErrorResponse(error);
            this.errorService.handle(errorResponse);
          });
        }).catch(error => {
        this.notificationService.fireErrorNotification('error.changeImage')
        this.errorService.handleError(error);
      }).finally(() => {
        this.spinner = false;
        this.form.disable();
      });
    }
  }

  public update() {
    this.spinner = true;
    this.profileService.update(this.getProfile())
      .then((profile: Profile) => {
        if (this.profile?.username !== profile.username) {
          location.reload();
        }
        this.profile = toProfile(profile);
        this.edit = false;
        this.languageService.set(profile.preferences.language);
        this.themeService.set(profile.preferences.theme);
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

  public changePassword() {
    lastValueFrom(
      this.dialog.open(
        ChangePasswordDialogComponent,
        {
          disableClose: true
        }
      ).afterClosed()
    ).then((token: string | undefined) => {
      if (token) {
        this.profileService.setToken(token);
      }
    })
  }

  public isGender(gender: Gender): boolean {
    if (this.form) {
      const control: AbstractControl | null = this.form.get('gender');
      if (control) {
        if (<Gender>control.getRawValue() == gender) {
          return true;
        }
      }
    }

    return false;
  }

  private getProfile(): Profile {
    const value = this.form.value;
    const profile: Profile = value as Profile;
    profile.preferences = {
      language: value.language.toUpperCase(),
      theme: value.theme.toUpperCase()
    }

    return profile;
  }

  private setForm(profile: Profile) {
    this.form.setValue({
      username: profile.username,
      firstName: profile.firstName,
      lastName: profile.lastName,
      gender: profile.gender,
      birthDate: profile.birthDate,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      language: profile.preferences.language,
      theme: profile.preferences.theme
    });
  }

  protected readonly Gender = Gender;
}
