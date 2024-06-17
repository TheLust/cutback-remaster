import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { ConfirmDialogData } from "../../../models/dialog/confirm-dialog-data";
import { translate, TranslocoPipe } from "@ngneat/transloco";

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    TranslocoPipe
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

  private readonly PREFIX: string = "confirmDialog.";
  private readonly DEFAULT_KEY: string = 'default';
  private readonly TITLE_KEY: string = '.title';
  private readonly TEXT_KEY: string = '.text';
  private readonly CANCEL_KEY: string = '.cancel';
  private readonly CONFIRM_KEY: string = '.confirm';

  title: string;
  text: string;
  cancel: string;
  confirm: string;

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData | string) {

    this.title = this.PREFIX + this.DEFAULT_KEY + this.TITLE_KEY;
    this.text = this.PREFIX + this.DEFAULT_KEY + this.TEXT_KEY;
    this.cancel = this.PREFIX + this.DEFAULT_KEY + this.CANCEL_KEY;
    this.confirm = this.PREFIX + this.DEFAULT_KEY + this.CONFIRM_KEY;

    if (data) {
      if (typeof data === 'string') {

        const tempTitle: string = this.PREFIX + data + this.TITLE_KEY;
        const tempText: string = this.PREFIX + data + this.TEXT_KEY;
        const tempCancel: string = this.PREFIX + data + this.CANCEL_KEY;
        const tempConfirm: string = this.PREFIX + data + this.CONFIRM_KEY;

        if (translate(tempTitle) !== tempTitle) {
          this.title = tempTitle;
        }

        if (translate(tempText) !== tempText) {
          this.text = tempText;
        }

        if (translate(tempCancel) !== tempCancel) {
          this.cancel = tempCancel;
        }

        if (translate(tempConfirm) != tempConfirm) {
          this.confirm = tempConfirm;
        }
      } else {
        if (data.title && translate(data.title) !== data.title) {
          this.title = data.title;
        }

        if (data.text && translate(data.text) !== data.text) {
          this.text = data.text;
        }

        if (data.cancel && translate(data.cancel) != data.cancel) {
          this.cancel = data.cancel;
        }

        if (data.confirm && translate(data.confirm) !== data.confirm) {
          this.confirm = data.confirm;
        }
      }
    }
  }

  public doCancel() {
    this.dialogRef.close(false);
  }

  public doConfirm() {
    this.dialogRef.close(true);
  }
}
