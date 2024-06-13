import {AbstractControl, ValidationErrors} from "@angular/forms";

export class CustomValidators {

  public static past(control: AbstractControl): ValidationErrors | null {
    const value: Date = control.getRawValue() as Date;

    if (value) {
      if (value >= new Date()) {
        return { 'past': true }
      }
    }

    return null;
  }
}
