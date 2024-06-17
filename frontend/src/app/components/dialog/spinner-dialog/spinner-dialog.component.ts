import { Component } from '@angular/core';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-spinner-dialog',
  standalone: true,
    imports: [
        MatProgressSpinner
    ],
  templateUrl: './spinner-dialog.component.html',
  styleUrl: './spinner-dialog.component.scss'
})
export class SpinnerDialogComponent {

}
