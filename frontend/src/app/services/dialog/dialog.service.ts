import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../components/confirm-dialog/confirm-dialog.component";
import { lastValueFrom } from "rxjs";
import { ConfirmDialogData } from "../../models/dialog/confirm-dialog-data";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  public confirm(data: ConfirmDialogData | string): Promise<boolean> {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: data
      }
    );

    return lastValueFrom(
      dialogRef.afterClosed()
    );
  }
}
