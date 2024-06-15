import { AfterViewInit, Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import { BaseFormComponent } from "../util/base-form-component";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CustomValidators } from "../util/custom-validators";
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
import { ErrorResponse } from "../../models/error/error-response";
import { handle, parseErrorResponse } from "../../error/error-utils";
import { Profile } from "../../models/response/profile";
import { Language, Theme } from "../../models/response/preferences";
import { MatButton } from "@angular/material/button";

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
    MatButton
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent extends BaseFormComponent implements AfterViewInit{

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
      this.form.disable();
    }
    this._edit = edit;
  }

  constructor(private profileService: ProfileService) {
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
  }

  ngAfterViewInit(): void {
    this.spinner = true;
    this.profileService.get()
      .then(value => {
        this.profile = toProfile(value);
        this.setForm(this.profile);
      }).catch(error => {
      const errorResponse: ErrorResponse = parseErrorResponse(error);
      handle(errorResponse);
    }).finally(() => {
      this.spinner = false;
      this.form.disable();
    });
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
