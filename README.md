<h1 align="center">ASW Credit Card Validator - validate card numbers.</h1>

<p align="center">
  <img src="https://user-images.githubusercontent.com/69723522/225834944-8ea6f27d-d02a-4903-91c3-bc97f9209251.svg" alt="asw-logo" width="310px" height="100px"/>
  <br>
  <i>`ASW Card Validator` library validates masking and card numbers, with the help of Luhn's algorithm using Angular.</i>
  <br>
</p>

<p align="center">
  <a href="https://asoftwareworld.com/#/product/card-validator"><strong>ASW credit card validator demo</strong></a>
  <br>
</p>

<p align="center">
  <a href="CONTRIBUTING.md">Contributing Guidelines</a>
  ·
  <a href="https://github.com/asoftwareworld/asw-credit-card-validator/issues">Submit an Issue</a>
  ·
  <a href="https://asoftwareworld.com/#/product/card-validator">Blog</a>
  <br>
  <br>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@asoftwareworld/card-validator">
    <img src="https://badge.fury.io/js/%40asoftwareworld%2Fcard-validator.svg" alt="CI status" />
  </a>&nbsp;
  <a href="https://circleci.com/gh/asoftwareworld/asw-credit-card-validator">
    <img src="https://circleci.com/gh/asoftwareworld/ASW-Form-Builder.svg?style=svg" alt="Asw QR Code on npm" />
  </a>&nbsp;
  <a href="https://github.com/asoftwareworld/asw-credit-card-validator/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Discord conversation" />
  </a>
</p>

# Documentation

`ASW Card Validator` library validates masking and card numbers, with the help of Luhn's algorithm using Angular. Identify card type `VISA`, `Amex`, `China UnionPay`, `Dankort`,  `Diners`,  `Discover`, `Elo`, `Hipercard`, `JCB`, `Maestro`, and `Mastercard` and then verify the card number, based on digits.

## Test card numbers
| Card Type| Card Number       | Expiry Date|CVV                                                                                                     |
| --------------- | --------------------|-------------|------------------------------------------------------------------------------ |
| American Express (Amex)|3700 0000 0000 002|03/2030| 7373|
| China UnionPay|6243 0300 0000 0001 |12/2029| 737    |
| Dankort| 5019 5555 4444 5555| 03/2030| 737|
|Diners|3600 6666 3333 44|03/2030|737|
|Discover|6011 6011 6011 6611|03/2030|737|
|Elo|5066 9911 1111 1118|03/2030|737|
|Hipercard|6062 8288 8866 6688|03/2030|737|
|JCB|3569 9900 1009 5841|03/2030|737|
|Maestro|6771 7980 2100 0008|03/2030|737|
|Mastercard|5555 3412 4444 1115|03/2030|737|
|Visa|4166 6766 6766 6746|03/2030|737|

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
<section>
    <div class="row">
        <div class="col-md-6 mb-4">
            <div class="card mb-4">
                <div class="card-header py-3">
                    <h5 class="mb-0">Angular material</h5>
                </div>
                <div class="card-body">
                    <form [formGroup]="aswMatCardForm">
                        <div class="row mb-4">
                            <div class="col-12">
                                <mat-form-field appearance="outline" class="asw-full-width">
                                    <mat-label>Credit Card Number</mat-label>
                                    <asw-card formControlName="creditCard" name="card" [required]="required"></asw-card>
                                    <mat-error
                                        *ngIf="aswMatCardForm.get('creditCard')?.invalid && (aswMatCardForm.get('creditCard')?.dirty || aswMatCardForm.get('creditCard')?.touched)">
                                        <ng-container *ngIf="aswMatCardForm.get('creditCard')?.errors?.['required']">
                                            Card number is required.
                                        </ng-container>
                                        <ng-container *ngIf="aswMatCardForm.get('creditCard')?.errors?.['minlength']">
                                            Card number has invalid length.
                                        </ng-container>
                                        <ng-container
                                            *ngIf="aswMatCardForm.get('creditCard')?.errors?.['invalidCardNumber'] && !aswMatCardForm.get('creditCard')?.errors?.['required'] && !aswMatCardForm.get('creditCard')?.errors?.['minlength']">
                                            Card number is invalid.
                                        </ng-container>
                                    </mat-error>
                                </mat-form-field>
                            </div>
                        </div>
                        <div class="row mb-4">
                            <div class="col-6">
                                <mat-form-field appearance="outline" class="asw-full-width">
                                    <mat-label>MM / YY</mat-label>
                                    <asw-card-date formControlName="cardDate" [required]="required"></asw-card-date>
                                    <mat-error
                                        *ngIf="aswMatCardForm.get('cardDate')?.invalid && (aswMatCardForm.get('cardDate')?.dirty || aswMatCardForm.get('cardDate')?.touched)">
                                        <ng-container *ngIf="aswMatCardForm.get('cardDate')?.errors?.['required']">
                                            Card date is required.
                                        </ng-container>
                                        <ng-container
                                            *ngIf="aswMatCardForm.get('cardDate')?.errors?.['invalidCardDate'] && !aswMatCardForm.get('cardDate')?.errors?.['required']">
                                            Card expired.
                                        </ng-container>
                                    </mat-error>
                                </mat-form-field>
                            </div>
                            <div class="col-6">
                                <mat-form-field appearance="outline" class="asw-full-width">
                                    <mat-label>CVV</mat-label>
                                    <asw-card-cvv formControlName="cvv" name="card" [required]="required"></asw-card-cvv>
                                    <mat-error
                                        *ngIf="aswMatCardForm.get('cvv')?.invalid && (aswMatCardForm.get('cvv')?.dirty || aswMatCardForm.get('cvv')?.touched)">
                                        <ng-container *ngIf="aswMatCardForm.get('cvv')?.errors?.['required']">
                                            CVV is required.
                                        </ng-container>
                                        <ng-container *ngIf="aswMatCardForm.get('cvv')?.errors?.['minlength']">
                                            Invalid CVV length.
                                        </ng-container>
                                        <ng-container
                                            *ngIf="aswMatCardForm.get('cvv')?.errors?.['invalidCardCvv'] && !aswMatCardForm.get('cvv')?.errors?.['required'] && !aswMatCardForm.get('cvv')?.errors?.['minlength']">
                                            CVV is invalid.
                                        </ng-container>
                                    </mat-error>
                                </mat-form-field>
                            </div>                            
                        </div>
                        <button class="btn btn-primary btn-lg btn-block" type="submit">
                            Continue to checkout
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-md-6 mb-4">
            <div class="card mb-4">
                <div class="card-header py-3">
                    <h5 class="mb-0">Bootstrap</h5>
                </div>
                <div class="card-body">
                    <form [formGroup]="aswBootstrapCardForm">
                        <div class="row mb-4">
                            <div class="col-12">
                                <div class="form-outline">
                                    <label for="cardNumber" class="form-label">Credit Card Number</label>
                                    <asw-card aswDefaultStyles aswInputClass="form-control form-control-lg" formControlName="creditCard"
                                        id="cardNumber" placeholder="Enter credit card number" name="card"
                                        [required]="required"></asw-card>
                                    <div class="invalid-feedback"
                                        *ngIf="aswBootstrapCardForm.get('creditCard')?.invalid && (aswBootstrapCardForm.get('creditCard')?.dirty || aswBootstrapCardForm.get('creditCard')?.touched)">
                                        <ng-container *ngIf="aswBootstrapCardForm.get('creditCard')?.errors?.required">
                                            Card number is required.
                                        </ng-container>
                                        <ng-container *ngIf="aswBootstrapCardForm.get('creditCard')?.errors?.minlength">
                                            Card number has invalid length.
                                        </ng-container>
                                        <ng-container
                                            *ngIf="aswBootstrapCardForm.get('creditCard')?.errors?.invalidCardNumber && !aswBootstrapCardForm.get('creditCard')?.errors?.required && !aswBootstrapCardForm.get('creditCard')?.errors?.minlength">
                                            Card number is invalid.
                                        </ng-container>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        <div class="row mb-4">
                            <div class="col-6">
                                <div class="form-outline">
                                    <label for="cardexpiry" class="form-label">MM / YY</label>
                                    <asw-card-date aswInputClass="form-control form-control-lg" id="cardexpiry"
                                        placeholder="Enter card expiry" formControlName="cardDate"
                                        [required]="required"></asw-card-date>
                                    <div class="invalid-feedback"
                                        *ngIf="aswBootstrapCardForm.get('cardDate')?.invalid && (aswBootstrapCardForm.get('cardDate')?.dirty || aswBootstrapCardForm.get('cardDate')?.touched)">
                                        <ng-container *ngIf="aswBootstrapCardForm.get('cardDate')?.errors?.required">
                                            Card date is required.
                                        </ng-container>
                                        <ng-container
                                            *ngIf="aswBootstrapCardForm.get('cardDate')?.errors?.invalidCardDate && !aswBootstrapCardForm.get('cardDate')?.errors?.required">
                                            Card expired.
                                        </ng-container>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-outline">
                                    <label for="cardcvv" class="form-label">CVV</label>
                                    <asw-card-cvv aswInputClass="form-control form-control-lg" id="cardcvv"
                                        placeholder="Enter card cvv" formControlName="cvv" name="card"
                                        [required]="required"></asw-card-cvv>
                                    <div class="invalid-feedback"
                                        *ngIf="aswBootstrapCardForm.get('cvv')?.invalid && (aswBootstrapCardForm.get('cvv')?.dirty || aswBootstrapCardForm.get('cvv')?.touched)">
                                        <ng-container *ngIf="aswBootstrapCardForm.get('cvv')?.errors?.required">
                                            CVV is required.
                                        </ng-container>
                                        <ng-container *ngIf="aswBootstrapCardForm.get('cvv')?.errors?.minlength">
                                            Invalid CVV length.
                                        </ng-container>
                                        <ng-container
                                            *ngIf="aswBootstrapCardForm.get('cvv')?.errors?.invalidCardCvv && !aswBootstrapCardForm.get('cvv')?.errors?.required && !aswBootstrapCardForm.get('cvv')?.errors?.minlength">
                                            CVV is invalid.
                                        </ng-container>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-lg btn-block" type="submit">
                            Continue to checkout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
```

Define in your component to get published event :

```
export class AppComponent implements OnInit {
    title = 'asw-credit-card-validator';
    aswMatCardForm: FormGroup;
    aswBootstrapCardForm: FormGroup;
    cardNumber = '';
    required = true;
    disabled = true;
    constructor(
        private fb: FormBuilder) {
        this.aswMatCardForm = this.fb.group({
            creditCard: ['', [Validators.required]],
            cvv: ['', [Validators.required]],
            cardDate: ['', [Validators.required]]
        });
        this.aswBootstrapCardForm = this.fb.group({
            creditCard: ['', [Validators.required]],
            cvv: ['', [Validators.required]],
            cardDate: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.aswMatCardForm = this.fb.group({
            creditCard: ['', [Validators.required, Validators.minLength(12)]],
            cvv: ['', [Validators.required, Validators.minLength(3)]],
            cardDate: ['', [Validators.required]]
        });
        this.aswBootstrapCardForm = this.fb.group({
            creditCard: ['', [Validators.required, Validators.minLength(12)]],
            cvv: ['', [Validators.required, Validators.minLength(3)]],
            cardDate: ['', [Validators.required]]
        });
    }

    submit(): void {
    }
}
```
## Theme
Angular Material [more information](https://material.angular.io/components/categories) 


## List of Input parameters for AswCard
| Input parameters| Default value       | Description                                                                                                     |
| --------------- | --------------------|------------------------------------------------------------------------------------------- |
| placeholder: string (optional)| | The placeholder is text shown when the label is floating but the input is empty.       |
| required: boolean (optional)| false   | User must specify a value for the input is required or not.    |
| disabled: boolean (optional)| false         | User must specify the input is disabled or not.|
|aswDefaultStyles: boolean (optional)| false| `aswDefaultStyles` is a set of predefined CSS styles that are applied to the ASW Credit Card Validator library's components by default.|
|aswInputClass: string (optional)| | `aswInputClass`property allows you to customize the styles of a component by specifying a custom CSS class for the component, which you can then define in your CSS file.|

## List of Input parameters for AswCardDate
| Input parameters| Default value       | Description                                                                                                     |
| --------------- | --------------------|------------------------------------------------------------------------------------------- |
| placeholder: string (optional)| | The placeholder is text shown when the label is floating but the input is empty.       |
| required: boolean (optional)| false   | User must specify a value for the input is required or not.    |
| disabled: boolean (optional)| false         | User must specify the input is disabled or not.|
|aswInputClass: string (optional)| | `aswInputClass`property allows you to customize the styles of a component by specifying a custom CSS class for the component, which you can then define in your CSS file.|

## List of Input parameters for AswCardCvv
| Input parameters| Default value       | Description                                                                                                     |
| --------------- | --------------------|------------------------------------------------------------------------------------------- |
| placeholder: string (optional)| | The placeholder is text shown when the label is floating but the input is empty.       |
| required: boolean (optional)| false   | User must specify a value for the input is required or not.    |
| disabled: boolean (optional)| false         | User must specify the input is disabled or not.|
|aswInputClass: string (optional)| | `aswInputClass`property allows you to customize the styles of a component by specifying a custom CSS class for the component, which you can then define in your CSS file.|


## List of Components
| Components        | Description                                                                                                     |
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
