/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { CardBrandType, CardSecurityCodeLabel } from './card-brand-type';

export interface CardType {
    type: CardBrandType;
    patterns: number[] | [number[]];
    gaps: any;
    format: RegExp;
    length: number[];
    luhn: boolean;
    code: {
        size: number[];
        securityCodeLabel: CardSecurityCodeLabel;
    };
}
