import { cards } from '@asoftwareworld/card-validator/api';

export function validateCardNumber(cardNumber: string): any {
    return cards.find((card: any) => {
        const matchResult = card.patterns
            .map((pattern: number | number[]) => validator(cardNumber, pattern))
            .filter((result: any) => result);
        return !!matchResult.length;
    });
}

function validateRange(cardNumber: string, min: number | string, max: number | string): boolean {
    const maxLengthToCheck = String(min).length;
    const substr = cardNumber.substr(0, maxLengthToCheck);
    const integerRepresentationOfCardNumber = parseInt(substr, 10);

    min = parseInt(String(min).substr(0, substr.length), 10);
    max = parseInt(String(max).substr(0, substr.length), 10);

    return (
        integerRepresentationOfCardNumber >= min &&
        integerRepresentationOfCardNumber <= max
    );
}

function validatePattern(cardNumber: string, pattern: string | number): boolean {
    pattern = String(pattern);
    return (pattern.substring(0, cardNumber.length) === cardNumber.substring(0, pattern.length));
}

export function validator(cardNumber: string, pattern: string | number | string[] | number[]): boolean {
    if (Array.isArray(pattern)) {
        return validateRange(cardNumber, pattern[0], pattern[1]);
    }
    return validatePattern(cardNumber, pattern);
}

