import { Component, Inject, ViewChild } from '@angular/core';
import { base64ToFile, ImageCroppedEvent, ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatSlider } from "@angular/material/slider";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-image-cropper-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ImageCropperComponent,
    MatSlider,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './image-cropper-dialog.component.html',
  styleUrl: './image-cropper-dialog.component.scss'
})
export class ImageCropperDialogComponent {

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent | undefined;
  transform: ImageTransform = {};
  private original: File;

  constructor(private dialogRef: MatDialogRef<ImageCropperDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { file: File }) {
    this.original = data.file;
  }

  onClose() {
    this.dialogRef.close();
  }

  onAccept() {
    const promise = this.imageCropper?.crop('blob');
    if (promise) {
     promise.then(event => {
        if (event) {
          if (event.blob) {
            this.dialogRef.close(new File([event.blob], this.original.name));
          }
        }
      });
    }
  }
}
