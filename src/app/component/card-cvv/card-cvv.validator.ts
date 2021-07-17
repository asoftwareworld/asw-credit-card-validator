import { FormControl } from '@angular/forms';
import { Verification } from './type/verification';

export const CardCvvValidator = (control: FormControl) => {
    const cardcvv = cvv(control.value);
    return (cardcvv.isValid) ? null : { invalidCvv: true };
};

// tslint:disable-next-line:no-bitwise
const DEFAULT_LENGTH = 3;

function includes(array: number[], thing: number): boolean {
    // array.forEach((value: number) => {
    //     if (thing === value) {
    //         return true;
    //     }
    // });

    for (let i = 0; i < array.length; i++) {
        if (thing === array[i]) {
            return true;
        }
    }

    return false;
}

function max(array: number[]): number {
    let maximum = DEFAULT_LENGTH;
    let i = 0;

    for (; i < array.length; i++) {
        maximum = array[i] > maximum ? array[i] : maximum;
    }

    return maximum;
}

function verification(isValid: boolean, isPotentiallyValid: boolean): Verification {
    return { isValid, isPotentiallyValid };
}

function cvv(value: string | unknown, maxLength: number | number[] = DEFAULT_LENGTH): Verification {
    maxLength = maxLength instanceof Array ? maxLength : [maxLength];

    if (typeof value !== 'string') {
        return verification(false, false);
    }
    if (!/^\d*$/.test(value)) {
        return verification(false, false);
    }
    if (includes(maxLength, value.length)) {
        return verification(true, true);
    }
    if (value.length < Math.min.apply(null, maxLength)) {
        return verification(false, true);
    }
    if (value.length > max(maxLength)) {
        return verification(false, false);
    }
    return verification(true, true);
}
