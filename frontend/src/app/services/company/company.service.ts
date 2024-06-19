import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Service } from "../service";
import { lastValueFrom } from "rxjs";
import { Company } from "../../models/response/company";

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends Service {

  private readonly COMPANY_URL: string = this.API_URL + "companies"

  constructor(private http: HttpClient) {
    super();
  }

  public getAllFull(): Promise<Company[]> {
    return lastValueFrom(
      this.http.get<Company[]>(
        this.COMPANY_URL + "/full",
        {
          responseType: 'json',
          headers: this.getHeaders()
        }
      )
    );
  }
}
