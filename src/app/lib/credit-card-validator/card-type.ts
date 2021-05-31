/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { CardCollection } from './interface/card-collection';
import { CreditCardBrandId, CreditCardType } from './type/credit-card-brand';
import { addMatchingCardsToResults } from './utils/add-matching-cards-to-results';
import { cardTypeConstant } from './utils/card-type-constant';
import { clone } from './utils/clone';
import { findBestMatch } from './utils/find-best-match';
import { isValidInputType } from './utils/is-valid-input-type';

let customCards = {} as CardCollection;

const cardNames: Record<string, CreditCardBrandId> = {
    VISA: 'visa',
    MASTERCARD: 'mastercard',
    AMERICAN_EXPRESS: 'american-express',
    DINERS_CLUB: 'diners-club',
    DISCOVER: 'discover',
    JCB: 'jcb',
    UNIONPAY: 'unionpay',
    MAESTRO: 'maestro',
    ELO: 'elo',
    MIR: 'mir',
    HIPER: 'hiper',
    HIPERCARD: 'hipercard',
};

const ORIGINAL_TEST_ORDER = [
    cardNames.VISA,
    cardNames.MASTERCARD,
    cardNames.AMERICAN_EXPRESS,
    cardNames.DINERS_CLUB,
    cardNames.DISCOVER,
    cardNames.JCB,
    cardNames.UNIONPAY,
    cardNames.MAESTRO,
    cardNames.ELO,
    cardNames.MIR,
    cardNames.HIPER,
    cardNames.HIPERCARD,
];

let testOrder = clone(ORIGINAL_TEST_ORDER) as string[];

function findType(cardType: string | number): CreditCardType {
    return customCards[cardType] || cardTypeConstant[cardType];
}

function getAllCardTypes(): CreditCardType[] {
    return testOrder.map(
        (cardType) => clone(findType(cardType)) as CreditCardType
    );
}

function getCardPosition(
    name: string,
    ignoreErrorForNotExisting = false
): number {
    const position = testOrder.indexOf(name);

    if (!ignoreErrorForNotExisting && position === -1) {
        throw new Error('"' + name + '" is not a supported card type.');
    }

    return position;
}

function creditCardType(cardNumber: string): Array<CreditCardType> {
    const results = [] as CreditCardType[];

    if (!isValidInputType(cardNumber)) {
        return results;
    }

    if (cardNumber.length === 0) {
        return getAllCardTypes();
    }

    testOrder.forEach((cardType) => {
        const cardConfiguration = findType(cardType);

        addMatchingCardsToResults(cardNumber, cardConfiguration, results);
    });

    const bestMatch = findBestMatch(results) as CreditCardType;

    if (bestMatch) {
        return [bestMatch];
    }

    return results;
}

creditCardType.getTypeInfo = (cardType: string): CreditCardType =>
    clone(findType(cardType)) as CreditCardType;

creditCardType.removeCard = (name: string): void => {
    const position = getCardPosition(name);

    testOrder.splice(position, 1);
};

creditCardType.addCard = (config: CreditCardType): void => {
    const existingCardPosition = getCardPosition(config.cardBrandId, true);

    customCards[config.cardBrandId] = config;

    if (existingCardPosition === -1) {
        testOrder.push(config.cardBrandId);
    }
};

creditCardType.updateCard = (
    cardType: string,
    updates: Partial<CreditCardType>
): void => {
    const originalObject = customCards[cardType] || cardTypeConstant[cardType];

    if (!originalObject) {
        throw new Error(
            `"${cardType}" is not a recognized type. Use \`addCard\` instead.'`
        );
    }

    if (updates.cardBrandId && originalObject.cardBrandId !== updates.cardBrandId) {
        throw new Error('Cannot overwrite type parameter.');
    }

    let clonedCard = clone(originalObject) as CreditCardType;

    clonedCard = { ...clonedCard, ...updates };

    customCards[clonedCard.cardBrandId] = clonedCard;
};

creditCardType.changeOrder = (name: string, position: number): void => {
    const currentPosition = getCardPosition(name);

    testOrder.splice(currentPosition, 1);
    testOrder.splice(position, 0, name);
};

creditCardType.resetModifications = (): void => {
    testOrder = clone(ORIGINAL_TEST_ORDER) as string[];
    customCards = {};
};

creditCardType.types = cardNames;

// export = creditCardType;