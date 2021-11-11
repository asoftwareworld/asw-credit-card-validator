/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AswDirectiveModule } from '@asoftwareworld/card-validator/common';
import { AswCardDate } from './card-date';

@NgModule({
    declarations: [
        AswCardDate
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        AswDirectiveModule
    ],
    exports: [
        AswCardDate
    ]
})
export class AswCardDateModule { }
