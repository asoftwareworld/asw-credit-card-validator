/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
export const luhnCheck = (cardNumber: string): boolean => {
    let sum = 0;
    let alt = false;
    let i = cardNumber.length - 1;
    let num;

    while (i >= 0) {
        num = parseInt(cardNumber.charAt(i), 10);

        if (alt) {
            num *= 2;
            if (num > 9) {
                num = (num % 10) + 1;
            }
        }
        alt = !alt;
        sum += num;
        i--;
    }

    return sum % 10 === 0;
};
