import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationComponent } from "../../components/notification/notification.component";
import { NotificationData } from "../../models/notification/notification-data";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly DEFAULT_DURATION: number = 2;

  constructor(private snackBar: MatSnackBar) {}

  public isMobile(): boolean {
    return window.innerWidth < 600;
  }

  public fireErrorNotificationWithDuration(data: NotificationData | string,
                                           duration: number) {
    if (typeof data === 'string') {
      data = {
        error: true,
        text: data
      };
    }

    this.snackBar.openFromComponent(
      NotificationComponent,
      {
        data: data,
        duration: duration * 1000,
        horizontalPosition:  this.isMobile() ?  'center' : 'end',
        verticalPosition: this.isMobile() ? 'bottom' : 'top',
        panelClass: ['error']
      }
    );
  }

  public fireErrorNotification(data: NotificationData | string) {
    this.fireErrorNotificationWithDuration(data, this.DEFAULT_DURATION);
  }
}
