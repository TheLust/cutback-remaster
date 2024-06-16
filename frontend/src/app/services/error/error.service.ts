import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { ErrorCode, ErrorResponse } from "../../models/error/error-response";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private router: Router) {}

  public handleError(error: any): void {
    const errorResponse: ErrorResponse = error.error as ErrorResponse;
    this.handle(errorResponse)
  }

  public handle(errorResponse: ErrorResponse): void {
    const errorCode: ErrorCode | undefined = errorResponse.errorCode;
    if (errorCode === ErrorCode.VALIDATION_ERROR) {
      throw new Error(ErrorCode.VALIDATION_ERROR.toString() + " given to handler");
    } else {
      if (errorCode === ErrorCode.UNAUTHORIZED) {
        this.router.navigate(['home']).then();
      }
    }
  }

  public parseErrorResponse(error: any): ErrorResponse {
    let body: Object;
    try {
      body = JSON.parse(JSON.parse(JSON.stringify(error.error)));
    } catch (err) {
      body = JSON.parse(JSON.stringify(error.error));
    }
    const errorResponse: ErrorResponse = Object.assign(new ErrorResponse(), body);
    errorResponse.errorCode = ErrorCode[errorResponse.errorCode as keyof typeof ErrorCode];
    if (errorResponse.errors) {
      errorResponse.errors = new Map(Object.entries(JSON.parse(JSON.stringify(errorResponse.errors))));
    } else {
      errorResponse.errors = undefined;
    }
    return errorResponse;
  }
}
