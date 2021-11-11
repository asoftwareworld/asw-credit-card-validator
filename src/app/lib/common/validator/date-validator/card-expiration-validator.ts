/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { FormControl } from '@angular/forms';
import { cardExpirationDate } from './card-expiration-date';

export const CardExpirationValidator = (control: FormControl) => {
    const date = cardExpirationDate(control.value);
    return (date.month && date.year) ? null : { invalidCardDate: true };
};
