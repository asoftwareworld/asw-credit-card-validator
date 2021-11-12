/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { CardBrandType, CardSecurityCodeLabel } from './card-brand-type';

export const cards = Object.freeze([
    {
        type: CardBrandType.VISA,
        patterns: [4],
        gaps: [4, 8, 12],
        length: [13, 16, 19],
        code: {
            securityCodeLabel: CardSecurityCodeLabel.CVV,
            size: [3],
        },
        luhn: true
    },
    {
        type: CardBrandType.MASTERCARD,
        patterns: [[51, 55], [2221, 2229], [223, 229], [23, 26], [270, 271], 2720],
        // patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
        gaps: [4, 8, 12],
        length: [16],
        code: {
            securityCodeLabel: CardSecurityCodeLabel.CVC,
            size: [3],
        },
        luhn: true
    },
    {
        type: CardBrandType.AMERICANEXPRESS,
        patterns: [34, 37],
        gaps: [4, 10],
        length: [15],
        code: {
            securityCodeLabel: CardSecurityCodeLabel.CID,
            size: [3, 4],
        },
        luhn: true
    },
    {
        type: CardBrandType.DINERSCLUB,
        patterns: [[300, 305], 36, 38, 39], // [30, 36, 38, 39],
        gaps: [4, 10],
        length: [14, 16],
        code: {
            securityCodeLabel: CardSecurityCodeLabel.CVV,
            size: [3],
        },
        luhn: true
    },
    {
        type: CardBrandType.DISCOVER,
        patterns: [6011, [644, 649], 65], // [60, 64, 65, 622],
        gaps: [4, 8, 12],
        length: [16],
        code: {
            securityCodeLabel: CardSecurityCodeLabel.CID,
            size: [3],
        },
        luhn: true
    },
    {
        type: CardBrandType.JCB,
        patterns: [2131, 1800, [3528, 3589]],
        gaps: [4, 8, 12],
        length: [16, 19],
        code: {
            securityCodeLabel: CardSecurityCodeLabel.CVV,
            size: [3],
        },
        luhn: true
    },
    {
        type: CardBrandType.UNIONPAY,
        patterns: [
            620,
            [624, 626],
            [62100, 62182],
            [62184, 62187],
            [62185, 62197],
            [62200, 62205],
            [622010, 622999],
            622018,
            [622019, 622999],
            [62207, 62209],
            [622126, 622925],
            [623, 626],
            6270,
            6272,
            6276,
            [627700, 627779],
            [627781, 627799],
            [6282, 6289],
            6291,
            6292,
            810,
            [8110, 8131],
            [8132, 8151],
            [8152, 8163],
            [8164, 8171],
        ],
        gaps: [4, 8, 12],
        length: [16, 17, 18, 19],
        code: {
            securityCodeLabel: CardSecurityCodeLabel.CVN,
            size: [3],
        },
        luhn: false
    },
    {
        type: CardBrandType.DANKORT,
        patterns: [5019],
        gaps: [4, 8, 12],
        length: [16],
        code: {
            securityCodeLabel: CardSecurityCodeLabel.CVV,
            size: [3],
        },
        luhn: true
    },
    {
        type: CardBrandType.HIPER,
        patterns: [637095, 63737423, 63743358, 637568, 637599, 637609, 637612],
        gaps: [4, 8, 12],
        length: [16],
        code: {
            securityCodeLabel: CardSecurityCodeLabel.CVC,
            size: [3],
        },
        luhn: true
    },
    {
        type: CardBrandType.HIPERCARD,
        patterns: [606282],
        gaps: [4, 8, 12],
        length: [16],
        code: {
            securityCodeLabel: CardSecurityCodeLabel.CVC,
            size: [3],
        },
        luhn: true
    },
    {
        type: CardBrandType.MAESTRO,
        patterns: [
            493698,
            [500000, 504174],
            [504176, 506698],
            [506779, 508999],
            [56, 59],
            63,
            67,
            6,
        ],
        gaps: [4, 8, 12],
        length: [12, 13, 14, 15, 16, 17, 18, 19],
        code: {
            securityCodeLabel: CardSecurityCodeLabel.CVC,
            size: [3],
        },
        luhn: true
    },
    {
        type: CardBrandType.ELO,
        patterns: [
            401178,
            401179,
            438935,
            457631,
            457632,
            431274,
            451416,
            457393,
            504175,
            [506699, 506778],
            [509000, 509999],
            627780,
            636297,
            636368,
            [650031, 650033],
            [650035, 650051],
            [650405, 650439],
            [650485, 650538],
            [650541, 650598],
            [650700, 650718],
            [650720, 650727],
            [650901, 650978],
            [651652, 651679],
            [655000, 655019],
            [655021, 655058],
        ],
        gaps: [4, 8, 12],
        length: [16],
        code: {
            securityCodeLabel: CardSecurityCodeLabel.CVE,
            size: [3],
        },
        luhn: true
    },
    {
        type: CardBrandType.MIR,
        patterns: [[2200, 2204]],
        gaps: [4, 8, 12],
        length: [16, 17, 18, 19],
        code: {
            securityCodeLabel: CardSecurityCodeLabel.CVP2,
            size: [3],
        },
        luhn: true
    },
    {
        type: CardBrandType.FORBRUGSFORENINGEN,
        patterns: [600],
        gaps: [4, 8, 12],
        length: [16],
        code: {
            securityCodeLabel: CardSecurityCodeLabel.CVV,
            size: [3],
        },
        luhn: true
    }
]);
