import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProfileService } from "../../services/profile/profile.service";
import { NgStyle } from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  backgroundImage: string = '';
  QRCode: string = '';

  constructor(private http: HttpClient,
              private profileService: ProfileService) {
    this.http.get('/assets/images/home.png', {responseType: 'blob'})
      .subscribe(res => {
        this.backgroundImage = URL.createObjectURL(res);
      });

    this.profileService.reloadQRCode.subscribe(() => {
      this.profileService.getCode()
        .then(blob => {
          this.QRCode = URL.createObjectURL(blob);
        }).catch(() => {
        this.http.get('/assets/images/qr-placeholder.jpg', {responseType: 'blob'})
          .subscribe(res => {
            this.QRCode = URL.createObjectURL(res);
          });
      });
    });

    this.profileService.reloadQRCode.next(true);
  }
}
