/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
export type CreditCardBrandId = | 'american-express'
    | 'diners-club'
    | 'discover'
    | 'elo'
    | 'hiper'
    | 'hipercard'
    | 'jcb'
    | 'maestro'
    | 'mastercard'
    | 'mir'
    | 'unionpay'
    | 'visa';

/**
 * Credit card brand names
 */
export type CreditCardBrandName = | 'American Express'
    | 'Diners Club'
    | 'Discover'
    | 'Elo'
    | 'Hiper'
    | 'Hipercard'
    | 'JCB'
    | 'Maestro'
    | 'Mastercard'
    | 'Mir'
    | 'UnionPay'
    | 'Visa';

/**
 * Security code label CVV number type
 */
export type CreditCardSecurityCodeLabel = | 'CVV'
    | 'CVC'
    | 'CID'
    | 'CVN'
    | 'CVE'
    | 'CVP2';

export type CreditCardType = {
    cardBrandId: string;
    cardBrandName: string;
    patterns: number[] | [number[]];
    gaps: number[];
    lengths: number[];
    code: {
        size: number;
        securityCodeLabel: string;
    };
    matchStrength?: number;
};
