/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { Verification } from '../type/verification';

export interface ExpiryMonthVerification extends Verification {
    isValidForThisYear: boolean;
}
