/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { Injectable } from '@angular/core';
import { Verification } from '../type/verification';

@Injectable({
    providedIn: 'root'
})
export class CardCvvService {
    code: any;
    cardNumber: any;
    cardIcon: any;
    private defaultLength = 3;

    cvv(value: string | unknown, maxLength: number | number[] = this.defaultLength): Verification {
        if (this.code) {
            this.defaultLength = this.code.size.length <= 1
                ? this.code.size[0] : this.code.size[1];
        }
        maxLength = maxLength instanceof Array ? maxLength : [this.defaultLength];

        if (typeof value !== 'string') {
            return { isValid: false, isPotentiallyValid: false };
        }
        if (!/^\d*$/.test(value)) {
            return { isValid: false, isPotentiallyValid: false };
        }
        if (this.includes(maxLength, value.length)) {
            return { isValid: true, isPotentiallyValid: true };
        }
        if (value.length < Math.min.apply(null, maxLength)) {
            return { isValid: false, isPotentiallyValid: true };
        }
        if (value.length > this.calculateCvvMaximumLength(maxLength)) {
            return { isValid: false, isPotentiallyValid: false };
        }
        return { isValid: true, isPotentiallyValid: true };
    }

    private includes(array: number[], thing: number): boolean {
        for (const item of array) {
            if (thing === item) {
                return true;
            }
        }
        return false;
    }

    private calculateCvvMaximumLength(array: number[]): number {
        let maximum = this.defaultLength;
        let i = 0;

        for (; i < array.length; i++) {
            maximum = array[i] > maximum ? array[i] : maximum;
        }
        return maximum;
    }
}
