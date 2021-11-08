/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { cards } from '../api/cards.constant';
import { Verification } from '../common/type/verification';

export class CommonUtils {
    static card: any;
    static defaultLength = 3;

    static cvv(value: string | unknown, maxLength: number | number[] = this.defaultLength): Verification {
        if (this.card) {
            this.defaultLength = this.card.size.length <= 1 ? this.card.size[0] : this.card.size[1];
        }
        // this.defaultLength = this.card.size;
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

    static includes(array: number[], thing: number): boolean {
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

    static calculateCvvMaximumLength(array: number[]): number {
        let maximum = this.defaultLength;
        let i = 0;

        for (; i < array.length; i++) {
            maximum = array[i] > maximum ? array[i] : maximum;
        }

        return maximum;
    }
}
export function validateCardNumber(cardNumber: string): any {
    return cards.find((card: any) => {
        const matchResult = card.patterns
            .map((pattern: number | number[]) => validator(cardNumber, pattern))
            .filter((result: any) => result);
        return !!matchResult.length;
    });
}

function validateRange(cardNumber: string, min: number | string, max: number | string): boolean {
    const maxLengthToCheck = String(min).length;
    const substr = cardNumber.substr(0, maxLengthToCheck);
    const integerRepresentationOfCardNumber = parseInt(substr, 10);

    min = parseInt(String(min).substr(0, substr.length), 10);
    max = parseInt(String(max).substr(0, substr.length), 10);

    return (
        integerRepresentationOfCardNumber >= min &&
        integerRepresentationOfCardNumber <= max
    );
}

function validatePattern(cardNumber: string, pattern: string | number): boolean {
    pattern = String(pattern);
    return (pattern.substring(0, cardNumber.length) === cardNumber.substring(0, pattern.length));
}

export function validator(cardNumber: string, pattern: string | number | string[] | number[]): boolean {
    if (Array.isArray(pattern)) {
        return validateRange(cardNumber, pattern[0], pattern[1]);
    }
    return validatePattern(cardNumber, pattern);
}
