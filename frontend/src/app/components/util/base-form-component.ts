import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { ErrorCode, ErrorResponse } from "../../models/response/error-response";
import { TranslocoService } from "@ngneat/transloco";

export class BaseFormComponent {

  private _spinner: boolean = false;
  public form: FormGroup;

  constructor(private transloco: TranslocoService,
              form: FormGroup) {
    this.form = form;
  }

  public get spinner() {
    return this._spinner;
  }

  public set spinner(spinner: boolean) {
    this._spinner = spinner;
    if (spinner) {
      this.form?.disable();
    } else {
      const currentErrors = this.getCurrentErrors(this.form);
      this.form.enable();
      this.setErrors(this.form, currentErrors);
    }
  }

  public getError(form: FormGroup, controlName: string): string {
    return this.transloco.translate('field.' + controlName) + ' ' +
      this.getErrorMessage(form.controls[controlName].errors)
  }

  private getErrorMessage(errors: ValidationErrors | null) {
    if (!errors) {
      return "";
    }

    const key: string = Object.keys(errors)[0];
    const value: any = errors[key];

    const translatedMessageTemplate: string = this.transloco.translate('violationCode.' + key);
    return this.interpolateErrorMessage(translatedMessageTemplate, value);
  }

  public putErrors(form: FormGroup,
                   errorResponse: ErrorResponse): void {
    if (!errorResponse.errorCode || (errorResponse.errorCode && errorResponse.errorCode !== ErrorCode.VALIDATION_ERROR)) {
      throw new Error("Cannot put errors because errorCode is not" + ErrorCode.VALIDATION_ERROR);
    }

    if (!errorResponse.errors) {
      throw new Error("Errors map is not valid");
    }
    const errors: Map<string, string> = errorResponse.errors;
    for (const controlName of Object.keys(form.controls)) {
      const validationErrorCode: string | undefined = errors.get(controlName);
      const control: AbstractControl | null = form.get(controlName);
      if (validationErrorCode && control) {
        let error: ValidationErrors;
        if (validationErrorCode.includes('length')) {
          error = {length: true} as ValidationErrors;
          const contentRegex = /\(([^)]+)\)/;
          const contentMatch = contentRegex.exec(validationErrorCode);
          if (!contentMatch) {
            throw new Error("Constraint length does not have a body");
          }

          const content = contentMatch[1];

          const regex = /min:(\d+), max:(\d+)/;
          const match = content.match(regex);
          if (!match) {
            throw new Error("Cannot extract values from length constraint content");
          }

          const min: number = parseFloat(match[1]);
          const max: number = parseFloat(match[2]);
          const current: number = (control.getRawValue() as string).length;

          if (current < min) {
            error = {minlength: {requiredLength: min}} as ValidationErrors;
          }

          if (current > max) {
            error = {maxlength: {requiredLength: max}} as ValidationErrors;
          }
        } else {
          error = {[validationErrorCode]: true} as ValidationErrors;
        }
        control.setErrors(error);
      }
    }
  }

  private interpolateErrorMessage(message: string, error: any): string {
    const placeholderRegex = /\{(.*?)\}/g;
    return message.replace(placeholderRegex, (match, placeholder) => {
      const properties = placeholder.split('.');
      const value = properties.reduce((obj: { [x: string]: any; }, prop: string | number) => obj && obj[prop], error);
      return value !== undefined ? value : match;
    });
  }

  private getCurrentErrors(form: FormGroup): { [key: string]: ValidationErrors | null } {
    const errors: { [key: string]: ValidationErrors | null } = {};
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  private setErrors(form: FormGroup, errors: { [key: string]: ValidationErrors | null }) {
    Object.keys(errors).forEach(key => {
      const control = form.get(key);
      if (control && errors[key]) {
        control.setErrors(errors[key]);
      }
    });
  }
}