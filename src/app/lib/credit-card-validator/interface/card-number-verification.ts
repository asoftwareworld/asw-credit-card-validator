/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { CreditCardType } from '../type/credit-card-brand';
import { Verification } from '../type/verification';

export interface CardNumberVerification extends Verification {
    card: CreditCardType | null;
}
