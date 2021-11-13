# ASW Credit Card Validator

[![npm version](https://badge.fury.io/js/%40asoftwareworld%2Fform-builder.svg)](https://www.npmjs.com/package/@asoftwareworld/card-validator)
[![Build status](https://circleci.com/gh/asoftwareworld/ASW-Form-Builder.svg?style=svg)](https://circleci.com/gh/asoftwareworld/asw-credit-card-validator)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/asoftwareworld/asw-credit-card-validator/blob/main/LICENSE)

`ASW Card Validator` library validates masking and card numbers, with the help of Luhn's algorithm using Angular. Identify card type `VISA`, `Amex`, `China UnionPay`, `Dankort`,  `Diners`,  `Discover`, `Elo`, `Hipercard`, `JCB`, `Maestro`, and `Mastercard` and then verify the card number, based on digits.


## [Live Demo](https://asoftwareworld.github.io/ASW-Form-Builder/#/)

## Installation
Below are some prerequisites before install `Card Validator`.

### Step 1: Install Angular Material
Install `Angular Material` by running the following command:

```html
ng add @angular/material
```

### Step 2: Install ASW Credit Card Validator
Install `Card Validator` to set up in the project by running the following command:
```html
npm install @asoftwareworld/card-validator
```

### Step 3: Import the component modules
Import the NgModule for each component you want to use:

```
import { AswCardModule } from '@asoftwareworld/card-validator/card';
import { AswCardCvvModule } from '@asoftwareworld/card-validator/card-cvv';
import { AswCardDateModule } from '@asoftwareworld/card-validator/card-date';
import { CardCvvService, CardCvvValidator } from '@asoftwareworld/card-validator/common';
// ...    
@NgModule({
    imports: [
    // shown passing global defaults (optional)
        AswCardModule,
        AswCardCvvModule,
        AswCardDateModule
        ...
    ],
    providers: [
        CardCvvService,
        CardCvvValidator
    ]
    // ...
})
export class AppModule { }
```

## Add a selector to HTML
In your template, use the component selector:
```
<div class="row">
    <div class="col-md-6">
        <form [formGroup]="aswCardForm">
            <div class="row">
                <div class="col-md-12">
                    <mat-form-field appearance="outline" class="asw-full-width">
                        <mat-label>Credit Card Number</mat-label>
                        <asw-card formControlName="creditCard" name="card" [required]="required"></asw-card>
                        <mat-error *ngIf="aswCardForm.get('creditCard')?.invalid && (aswCardForm.get('creditCard')?.dirty || aswCardForm.get('creditCard')?.touched)">
                            <mat-error *ngIf="aswCardForm.get('creditCard')?.errors?.required">
                                Card number is required.
                            </mat-error>
                            <mat-error *ngIf="aswCardForm.get('creditCard')?.errors?.minlength">
                                Card number has invalid length.
                            </mat-error>
                            <mat-error *ngIf="aswCardForm.get('creditCard')?.errors?.invalidCardNumber && !aswCardForm.get('creditCard')?.errors?.required && !aswCardForm.get('creditCard')?.errors?.minlength">
                                Card number is invalid.
                            </mat-error>
                        </mat-error>
                    </mat-form-field>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <mat-form-field appearance="outline" class="asw-full-width">
                        <mat-label>MM / YY</mat-label>
                        <asw-card-date formControlName="cardDate" [required]="required"></asw-card-date>
                        <mat-error *ngIf="aswCardForm.get('cardDate')?.invalid && (aswCardForm.get('cardDate')?.dirty || aswCardForm.get('cardDate')?.touched)">
                            <mat-error *ngIf="aswCardForm.get('cardDate')?.errors?.required">
                                Card date is required.
                            </mat-error>
                            <mat-error *ngIf="aswCardForm.get('cardDate')?.errors?.invalidCardDate && !aswCardForm.get('cardDate')?.errors?.required">
                                Card expired.
                            </mat-error>
                        </mat-error>
                    </mat-form-field>
                </div>
                <div class="col-md-6">
                    <mat-form-field appearance="outline" class="asw-full-width">
                        <mat-label>CVV</mat-label>
                        <asw-card-cvv formControlName="cvv" name="card" [required]="required"></asw-card-cvv>
                        <mat-error *ngIf="aswCardForm.get('cvv')?.invalid && (aswCardForm.get('cvv')?.dirty || aswCardForm.get('cvv')?.touched)">
                            <mat-error *ngIf="aswCardForm.get('cvv')?.errors?.required">
                                CVV is required.
                            </mat-error>
                            <mat-error *ngIf="aswCardForm.get('cvv')?.errors?.minlength">
                                Invalid CVV length.
                            </mat-error>
                            <mat-error *ngIf="aswCardForm.get('cvv')?.errors?.invalidCardCvv && !aswCardForm.get('cvv')?.errors?.required && !aswCardForm.get('cvv')?.errors?.minlength">
                                CVV is invalid.
                            </mat-error>
                        </mat-error>
                    </mat-form-field>
                </div>
            </div>
        </form>
    </div>
</div>
```

Define in your component to get published event :

```
export class AppComponent implements OnInit {
    aswCardForm!: FormGroup;
    required = true;
    disabled = true;
    constructor(
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.validateFormBuilder();        
    }

    validateFormBuilder(): void {
        this.aswCardForm = this.formBuilder.group({
            creditCard: ['', [Validators.required, Validators.minLength(12)]],
            cvv: ['', [Validators.required, Validators.minLength(3)]],
            cardDate: ['', [Validators.required]]
        });
    }
}
```
## Theme
Angular Material [more information](https://material.angular.io/components/categories) 

## List of Controls available
| controls        | description                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| Card            | Card validator validates masking and card numbers, with the help of Luhn's algorithm. Identify card type, `VISA`, `Amex`, `China UnionPay`, `Dankort`,  `Diners`,  `Discover`, `Elo`, `Hipercard`, `JCB`, `Maestro`, and `Mastercard` and then verify the card number, just by looking at the digits      |
| Card CVV        | CVV validation by default test for a numeric string of 4 characters in length. The `maxLength` can be overridden based on card number. The length will be changed 3 to 4 in the case of an American Express card which expects a 4 digit.                                                                                        |
| Card Date       | Card month accepts 1 or 2 digit months. `1`, `01`, `10` are valid month. Year accepts 2 digit only. `21`, `22` is valid year. The maxElapsedYear parameter determines how many years in the future a card's expiration date should be considered valid. It has a default value of 19, so cards with an expiration date 20 or more years in the future would not be considered valid. It can be overridden by passing in an integer as a second argument.          |

## Browser Support

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | 
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | 
| Latest ✔                                                                                 | Latest ✔                                                                                    | Latest ✔                                                                                 | Latest ✔                                                                              | Latest ✔                                                                                                                                                                                                    |
## [Report a bug](https://github.com/asoftwareworld/asw-credit-card-validator/issues)
We use GitHub Issues as the official bug tracker for the ASW Credit Card Validator. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of the ASW Credit Card Validator.
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.

## Technical Support or Questions
If you have questions or need help please email `asoftwareworld@gmail.com`

## License
[MIT](https://github.com/asoftwareworld/asw-credit-card-validator/blob/main/LICENSE)

## Social Media

Twitter: <https://twitter.com/asoftwareworld>

LinkedIn: <https://in.linkedin.com/company/asoftwareworld>

Facebook: <https://www.facebook.com/asoftwaresworld>

## Donate
<a href="https://paypal.me/asoftwareworld?locale.x=en_GB"><img src="blue.svg" height="40"></a>  
If you found value in `ASW Credit Card Validator` or a contributor helped you out of a jam, consider becoming a contributor yourself.
