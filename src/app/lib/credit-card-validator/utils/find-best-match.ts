/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { CreditCardType } from '../type/credit-card-brand';

function hasEnoughResultsToDetermineBestMatch(results: CreditCardType[]): boolean {
    const numberOfResultsWithMaxStrengthProperty = results.filter(
        (result) => result.matchStrength
    ).length;

    /*
     * if all possible results have a maxStrength property that means the card
     * number is sufficiently long enough to determine conclusively what the card
     * type is
     * */
    return (
        numberOfResultsWithMaxStrengthProperty > 0 &&
        numberOfResultsWithMaxStrengthProperty === results.length
    );
}

export function findBestMatch(results: CreditCardType[]): CreditCardType | null {
    if (!hasEnoughResultsToDetermineBestMatch(results)) {
        return null;
    }

    return results.reduce((bestMatch, result) => {
        if (!bestMatch) {
            return result;
        }

        /*
         * If the current best match pattern is less specific than this result, set
         * the result as the new best match
         * */
        if (Number(bestMatch.matchStrength) < Number(result.matchStrength)) {
            return result;
        }

        return bestMatch;
    });
}
