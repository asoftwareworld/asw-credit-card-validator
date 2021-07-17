/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import {
    CreditCardBrandId,
    CreditCardBrandName,
    CreditCardType,
    CreditCardSecurityCodeLabel
} from '../type/credit-card-brand';

export interface BuiltInCreditCardType extends CreditCardType {
    cardBrandId: CreditCardBrandId;
    cardBrandName: CreditCardBrandName;
    code: {
        size: 3 | 4;
        securityCodeLabel: CreditCardSecurityCodeLabel;
    };
}

export interface CardCollection {
    [propName: string]: CreditCardType;
}
