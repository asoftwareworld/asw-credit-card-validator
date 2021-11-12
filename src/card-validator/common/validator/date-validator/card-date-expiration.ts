/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { ExpirationDateVerification } from '../../interface/expiration-date-verification';
import { cardMonthExpiration } from './card-month-expiration';
import { cardYearExpiration } from './card-year-expiration';
import { parseDate } from './parse-date';

function verification(
    isValid: boolean,
    isPotentiallyValid: boolean,
    month: string | null,
    year: string | null): ExpirationDateVerification {
    return {
        isValid,
        isPotentiallyValid,
        month,
        year,
    };
}

export function cardExpirationDate(
    value: string | Record<string, string | number> | unknown,
    maxElapsedYear?: number): ExpirationDateVerification {
    let date;

    if (typeof value === 'string') {
        value = value.replace(/^(\d\d) (\d\d(\d\d)?)$/, '$1/$2');
        date = parseDate(String(value));
    } else if (value !== null && typeof value === 'object') {
        const fullDate = { ...value } as ExpirationDateVerification;
        date = {
            month: String(fullDate.month),
            year: String(fullDate.year),
        };
    } else {
        return verification(false, false, null, null);
    }

    const monthValid = cardMonthExpiration(date.month);
    const yearValid = cardYearExpiration(date.year, maxElapsedYear);

    if (monthValid.isValid) {
        if (yearValid.isCurrentYear) {
            const isValidForThisYear = monthValid.isValidForThisYear;

            return verification(
                isValidForThisYear,
                isValidForThisYear,
                date.month,
                date.year
            );
        }

        if (yearValid.isValid) {
            return verification(true, true, date.month, date.year);
        }
    }

    if (monthValid.isPotentiallyValid && yearValid.isPotentiallyValid) {
        return verification(false, true, null, null);
    }

    return verification(false, false, null, null);
}
