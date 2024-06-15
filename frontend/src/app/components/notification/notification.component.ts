import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef
} from "@angular/material/snack-bar";
import { MatButton, MatIconButton } from "@angular/material/button";
import { NotificationData } from "../../models/notification/notification-data";
import { translate, TranslocoPipe } from "@ngneat/transloco";
import { NgIf } from "@angular/common";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    MatButton,
    TranslocoPipe,
    NgIf,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  error: boolean;
  text: string;
  icon: boolean;
  button: string;

  constructor(private notificationRef: MatSnackBarRef<NotificationComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData) {

    this.error = false;
    this.icon = true;
    this.button = 'close';

    if (data) {
      this.checkTranslation(data.text);
      this.error = data.error;
      this.text = data.text;
      if (data.action) {
        if (data.action.icon) {
          this.icon = data.action.icon;
          this.button = data.action.button;
        } else {
          this.checkTranslation(data.action.button);
          this.button = data.action.button;
        }
      }
    } else {
      throw new Error('data cannot be null/unknown');
    }
  }

  public close() {
    this.notificationRef.dismiss();
  }

  private checkTranslation(value: string) {
    if (translate(value) === value) {
      throw new Error("translation does not exist");
    }
  }
}
