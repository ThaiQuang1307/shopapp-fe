import { AbstractControl, FormControl, ValidationErrors, Validators } from "@angular/forms";

export class MyValidators extends Validators {
    static phoneNumber(control: AbstractControl): ValidationErrors | null {
        const value = control.value;

        if (!value) {
            return null;
        }

        return isPhoneNumber(value)
            ? null
            : { invalidPhoneNumber: true };
    }

    static password(control: AbstractControl): ValidationErrors | null {
        const value = control.value;

        if (!value) {
            return null;
        }

        return value?.length >= 8
            ? null
            : { invalidPassword: true };
    }

}

function isPhoneNumber(value: string) {
    if (value?.length != 10) {
        return false
    }
    return typeof value === 'string' && /^0[0-9]{0,10}$/.test(value);
}