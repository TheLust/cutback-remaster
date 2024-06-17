import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass, NgIf, NgStyle } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ControlValueAccessor } from "@angular/forms";
import { ImageCropperDialogComponent } from "./image-cropper-dialog/image-cropper-dialog.component";

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    NgIf,
    MatIcon
  ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent implements OnInit, ControlValueAccessor  {
  fileUrl: string = '';
  private _file: File | undefined;
  @Input() get file(): File | undefined {
    return this._file;
  } set file(file: File | undefined) {
    this._file = file;
    if (this.file) {
      this.fileUrl = URL.createObjectURL(this.file);
    }
  }
  @Output() fileChange: EventEmitter<File> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  writeValue(_file: File | undefined): void {
    this.file = _file;
    if (this.file) {
      this.fileUrl = URL.createObjectURL(this.file);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange = (fileUrl: File | undefined) => {};

  onTouched = () => {};

  disabled: boolean = false;

  onFileChange(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file: File = files[0];
      this.resetInput();
      this.openAvatarEditor(_file)
        .subscribe(
          (result: File | undefined) => {
            if (result) {
              this.file = result
              this.fileUrl = URL.createObjectURL(this.file);
              this.fileChange.emit(this.file);
              this.onChange(this.file);
            }
          }
        )
    }
  }

  openAvatarEditor(image: File): Observable<any> {
    const dialogRef = this.dialog.open(
        ImageCropperDialogComponent,
        {
          data: { file: image }
        });

    return dialogRef.afterClosed();
  }

  resetInput(){
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if(input){
      input.value = "";
    }
  }
}
