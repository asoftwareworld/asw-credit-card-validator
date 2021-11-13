/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'asw-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'asw-credit-card-validator';
    aswCardForm: FormGroup;
    cardNumber = '';
    required = true;
    disabled = true;
    constructor(
        private fb: FormBuilder) {
        this.aswCardForm = this.fb.group({
            creditCard: ['', [Validators.required]],
            cvv: ['', [Validators.required]],
            cardDate: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.aswCardForm = this.fb.group({
            creditCard: ['', [Validators.required, Validators.minLength(12)]],
            cvv: ['', [Validators.required, Validators.minLength(3)]],
            cardDate: ['', [Validators.required]]
        });
    }

    submit(): void {
        // debugger
    }
}

