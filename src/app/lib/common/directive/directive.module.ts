/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AswNumberOnly } from './number-only';
import { AswDateFormat } from './date-format';

@NgModule({
    declarations: [
        AswNumberOnly,
        AswDateFormat
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AswNumberOnly,
        AswDateFormat
    ]
})
export class AswDirectiveModule { }
