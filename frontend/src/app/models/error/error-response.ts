export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  ACCESS_DENIED = 'ACCESS_DENIED',
  BAD_REQUEST = 'BAD_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  BAD_CREDENTIALS = 'BAD_CREDENTIALS',
  USER_WO_ACCOUNT = 'USER_WO_ACCOUNT'

}

export class ErrorResponse {
  message: string | undefined;
  errorCode: ErrorCode | undefined;
  errors: Map<string, string> | undefined;
}
