/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { Verification } from './../type/verification';

export interface ExpirationDateVerification extends Verification {
    month: string | null;
    year: string | null;
}

export interface ExpirationMonthVerification extends Verification {
    isValidForThisYear: boolean;
}

export interface ExpirationYearVerification extends Verification {
    isCurrentYear: boolean;
}
