/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { FormControl } from '@angular/forms';
import { luhnCheck } from '../algo/luhn';

export const CardValidator = (control: FormControl) => {
    return luhnCheck(control.value) ? null : { invalidCardNumber: true };
};
