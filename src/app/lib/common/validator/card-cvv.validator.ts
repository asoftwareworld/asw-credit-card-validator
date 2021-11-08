/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { FormControl } from '@angular/forms';
import { CommonUtils } from '../../utils/common.utils';
import { Verification } from '../type/verification';

export const CardCvvValidator = (control: FormControl) => {
    const cardcvv = CommonUtils.cvv(control.value);
    return (cardcvv.isValid) ? null : { invalidCvv: true };
};
const DEFAULT_LENGTH = 3;

function includes(array: number[], thing: number): boolean {
    // array.forEach((value: number) => {
    //     if (thing === value) {
    //         return true;
    //     }
    // });

    for (const item of array) {
        if (thing === item) {
            return true;
        }
    }

    // for (let i = 0; i < array.length; i++) {
    //     if (thing === array[i]) {
    //         return true;
    //     }
    // }

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
