import { ErrorResponse } from "../models/error/error-response";

export class CutbackError extends Error {

  errorResponse: ErrorResponse;

  constructor(errorResponse: ErrorResponse) {
    super();
    this.errorResponse = errorResponse;
  }
}
