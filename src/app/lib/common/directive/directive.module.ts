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

@NgModule({
    declarations: [
        AswNumberOnly
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AswNumberOnly
    ]
})
export class AswDirectiveModule { }
