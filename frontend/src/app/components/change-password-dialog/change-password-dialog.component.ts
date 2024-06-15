import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { BaseFormComponent } from "../util/base-form-component";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss'
})
export class ChangePasswordDialogComponent extends BaseFormComponent{

  constructor(private dialogRef: MatDialogRef<ChangePasswordDialogComponent>) {
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
}
