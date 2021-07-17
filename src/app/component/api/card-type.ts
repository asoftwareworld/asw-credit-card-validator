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
