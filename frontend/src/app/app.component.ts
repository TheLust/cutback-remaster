import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {HeaderComponent} from "./components/header/header.component";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./services/auth/auth.service";
import {Profile} from "./models/profile";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  profile: Profile | undefined;

  constructor(private authService: AuthService) {
    if (authService.isAuthenticated()) {
      console.log("get profile");
    }
  }
}
