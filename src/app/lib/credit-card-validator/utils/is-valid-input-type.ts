/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
export function isValidInputType<T>(cardNumber: T): boolean {
    return typeof cardNumber === 'string' || cardNumber instanceof String;
}
