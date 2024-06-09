import { Component } from '@angular/core';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-progress-spinner',
  standalone: true,
  imports: [
    MatProgressSpinner
  ],
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss'
})
export class ProgressSpinnerComponent {

}
