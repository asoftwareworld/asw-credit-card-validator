/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AswCardModule } from '@asoftwareworld/card-validator/card';
import { AswCardCvvModule } from '@asoftwareworld/card-validator/card-cvv';
import { AswCardDateModule } from '@asoftwareworld/card-validator/card-date';
import { CardCvvService, CardCvvValidator } from '@asoftwareworld/card-validator/common';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AswCardModule,
        AswCardCvvModule,
        AswCardDateModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers: [CardCvvService, CardCvvValidator],
    bootstrap: [AppComponent]
})
export class AppModule { }
