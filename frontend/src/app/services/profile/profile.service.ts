import { Injectable } from '@angular/core';
import { Service } from "../service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Profile } from "../../models/response/profile";

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends Service {

  readonly PROFILE_URL = this.API_URL + 'profile';

  constructor(private httpClient: HttpClient) {
    super();
  }

  public get(): Promise<Profile> {
    return lastValueFrom(
      this.httpClient.get<Profile>(
        this.PROFILE_URL,
        {
          responseType: 'json',
          headers: this.getHeaders()
        }
      )
    );
  }

  public create(profile: Profile): Promise<Profile> {
    return lastValueFrom(
      this.httpClient.post<Profile>(
        this.PROFILE_URL,
        profile,
        {
          responseType: 'json',
          headers: this.getHeaders()
        }
      )
    );
  }
}
