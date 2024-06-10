import { ErrorResponse } from "../models/response/error-response";

export class CutbackError extends Error {

  errorResponse: ErrorResponse;

  constructor(errorResponse: ErrorResponse) {
    super();
    this.errorResponse = errorResponse;
  }
}
