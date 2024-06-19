import { Routes } from '@angular/router';
import { HomeComponent } from "./page/home/home.component";
import { ProfileComponent } from "./page/profile/profile.component";
import { CompanyListComponent } from "./page/company-list/company-list.component";

export const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "home", component: HomeComponent},
  {path: "profile", component: ProfileComponent},
  {path: "companies", component: CompanyListComponent}
];
