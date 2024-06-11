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
import { AuthService } from "../../services/auth/auth.service";
import { NgIf } from "@angular/common";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatOption, MatSelect } from "@angular/material/select";
import { Gender } from "../../models/response/gender";

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
    MatOption
  ],
  templateUrl: './create-account-dialog.component.html',
  styleUrl: './create-account-dialog.component.scss'
})
export class CreateAccountDialogComponent extends BaseFormComponent {

  constructor(public dialogRef: MatDialogRef<CreateAccountDialogComponent>,
              private authService: AuthService) {
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

  protected readonly Gender = Gender;
}
