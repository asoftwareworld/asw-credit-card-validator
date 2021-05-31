/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { CreditCardType } from '../type/credit-card-brand';
import { clone } from './clone';
import { validator } from './validator';

export function addMatchingCardsToResults(cardNumber: string, cardConfiguration: CreditCardType, results: Array<CreditCardType>): void {
    let i;
    let patternLength;

    for (i = 0; i < cardConfiguration.patterns.length; i++) {
        const pattern = cardConfiguration.patterns[i];

        if (!validator(cardNumber, pattern)) {
            continue;
        }

        const clonedCardConfiguration = clone(cardConfiguration) as CreditCardType;

        if (Array.isArray(pattern)) {
            patternLength = String(pattern[0]).length;
        } else {
            patternLength = String(pattern).length;
        }

        if (cardNumber.length >= patternLength) {
            clonedCardConfiguration.matchStrength = patternLength;
        }

        results.push(clonedCardConfiguration);
        break;
    }
}
