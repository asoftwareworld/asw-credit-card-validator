import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'asw-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'asw-credit-card-validator';
    withoutMaterialForm: FormGroup;
    cardNumber = '';
    constructor(private fb: FormBuilder) {
        this.withoutMaterialForm = this.fb.group({
            creditCardCvvWithoutMaterial: [],
            creditCard: []
        });
    }

    ngOnInit() {
        this.withoutMaterialForm = this.fb.group({
            creditCardCvvWithoutMaterial: [],
            creditCard: []
        });
    }
}
