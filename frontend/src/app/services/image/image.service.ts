import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Service } from "../service";
import { Size } from "../../models/request/size";

@Injectable({
  providedIn: 'root'
})
export class ImageService extends Service {

  private readonly IMAGE_URL: string = this.API_URL + "images"

  constructor(private http: HttpClient) {
    super();
  }

  public getImage(uuid: string, size: Size): Promise<Blob> {
    return lastValueFrom(
      this.http.get(
        this.IMAGE_URL + "/" + uuid + "?size=" + size.toUpperCase(),
        {
          responseType: 'blob',
          headers: this.getHeaders()
        }
      )
    );
  }
}
