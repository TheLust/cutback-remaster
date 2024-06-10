import { ErrorCode, ErrorResponse } from "../models/response/error-response";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export function handleError(error: any): void {
  const errorResponse: ErrorResponse = error.error as ErrorResponse;
  handle(errorResponse)
}

export function handle(errorResponse: ErrorResponse): void {
  const errorCode: ErrorCode | undefined = errorResponse.errorCode;
  if (errorCode === ErrorCode.VALIDATION_ERROR) {
    throw new Error(ErrorCode.VALIDATION_ERROR.toString() + " given to handler");
  } else {
    //TODO
  }
}

export function parseErrorResponse(error: any): ErrorResponse {
  const body: Object = JSON.parse(JSON.parse(JSON.stringify(error.error)));
  const errorResponse: ErrorResponse = Object.assign(new ErrorResponse(), body);
  errorResponse.errorCode = ErrorCode[errorResponse.errorCode as keyof typeof ErrorCode];
  if (errorResponse.errors) {
    errorResponse.errors = new Map(Object.entries(JSON.parse(JSON.stringify(errorResponse.errors))));
  } else {
    errorResponse.errors = undefined;
  }
  return errorResponse;
}
