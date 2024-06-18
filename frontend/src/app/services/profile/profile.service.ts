import { Injectable } from '@angular/core';
import { Service } from "../service";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, lastValueFrom } from "rxjs";
import { Profile } from "../../models/response/profile";
import { ChangePasswordRequest } from '../../models/request/change-password-request';
import { Size } from "../../models/request/size";

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends Service {

  readonly PROFILE_URL = this.API_URL + 'profile';
  public reloadImage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public reloadQRCode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

  public deleteUser(): Promise<void> {
    return lastValueFrom(
      this.httpClient.delete<void>(
        this.PROFILE_URL + '/user',
        {
          headers: this.getHeaders()
        }
      )
    );
  }

  public update(profile: Profile): Promise<Profile> {
    return lastValueFrom(
      this.httpClient.put<Profile>(
        this.PROFILE_URL,
        profile,
        {
          responseType: 'json',
          headers: this.getHeaders()
        }
      )
    );
  }

  public changePassword(request: ChangePasswordRequest): Promise<string> {
    return lastValueFrom(
      this.httpClient.put(
        this.PROFILE_URL + '/change-password',
        request,
        {
          responseType: 'text',
          headers: this.getHeaders()
        }
      )
    );
  }

  public changeImage(image: File): Promise<Profile> {
    const formData = new FormData();
    formData.append('image', image);
    return lastValueFrom(
      this.httpClient.put<Profile>(
        this.PROFILE_URL + '/change-image',
          formData,
          {
              responseType: 'json',
              headers: this.getHeaders()
          }
      )
    );
  }

  public getImage(size: Size): Promise<Blob> {
      return lastValueFrom(
          this.httpClient.get(
              this.PROFILE_URL + "/image?size=" + size,
              {
                  responseType: 'blob',
                  headers: this.getHeaders()
              }
          )
      );
  }

  public getCode(): Promise<Blob> {
    return lastValueFrom(
      this.httpClient.get(
        this.PROFILE_URL + "/qr-code",
        {
          responseType: 'blob',
          headers: this.getHeaders()
        }
      )
    );
  }
}
