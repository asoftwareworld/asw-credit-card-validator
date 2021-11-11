/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { CardCvvService } from './../service/card-cvv.service';

@Directive({
    selector: '[aswCvvValidator]'
})
export class CardCvvValidator implements Validator {
    constructor(
        private cardCvvService: CardCvvService) {
    }
    validate(control: AbstractControl): ValidationErrors | null {
        const cardcvv = this.cardCvvService.cvv(control.value);
        return (cardcvv.isValid) ? null : { invalidCardCvv: true };
    }
}
