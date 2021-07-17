import { ValidatorFn, AbstractControl } from '@angular/forms';
import { luhnCheck } from './luhn';

export function luhnValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        const isValid = luhnCheck(control.value);
        return isValid ? null : { luhnCheck: isValid };
    };
}
