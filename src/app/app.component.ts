import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'asw-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'asw-credit-card-validator';
    aswCardForm: FormGroup;
    cardNumber = '';
    required = true;
    disabled = true;
    constructor(private fb: FormBuilder) {
        this.aswCardForm = this.fb.group({
            // creditCardCvvWithoutMaterial: [],
            creditCard: [],
            cvv: []
        });
    }

    ngOnInit(): void {
        this.aswCardForm = this.fb.group({
            // creditCardCvvWithoutMaterial: [],
            creditCard: [],
            cvv: []
        });
    }

    submit(): void{
        // debugger
    }
}
