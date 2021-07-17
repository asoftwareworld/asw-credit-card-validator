import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, forwardRef, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { validateCardNumber } from '@asoftwareworld/card-validator/core';
import { Subject } from 'rxjs';
import { cardIcons } from './card-icons';

@Component({
    selector: 'asw-card',
    templateUrl: './card.html',
    styleUrls: ['./card.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AswCard),
        multi: true
    }],
    encapsulation: ViewEncapsulation.None
})
export class AswCard implements OnInit, ControlValueAccessor {
    private _value: any;
    stateChanges = new Subject<void>();
    onChange: any;

    @Input() get value(): string {
        return this._value;
    }
    set value(cardNumber) {
        this._value = cardNumber;
        this.onChange(cardNumber);
        this.stateChanges.next();
    }

    cardNumber = '';
    onTouched: any;
    focused = false;
    maxNumberLimit = 1;
    cardIcon = cardIcons.default;
    errorState: boolean | null = false;
    ngControl: NgControl | null = null;

    constructor(
        private injector: Injector,
        private elRef: ElementRef<HTMLElement>,
        private fm: FocusMonitor) {
        fm.monitor(elRef.nativeElement, true).subscribe(origin => {
            this.focused = !!origin;
            this.stateChanges.next();
        });
    }

    ngOnInit(): void {
        this.ngControl = this.injector.get(NgControl);
        if (this.ngControl !== null) {
            // Setting the value accessor directly (instead of using
            // the providers) to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }

    writeValue(value: string): void {
        if (value) {
            this.cardNumber = value;
        }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    updateIcon(event: Event): void {
        const value = (event.target as HTMLInputElement).value.replace(/\s/g, '');
        let cardType = 'default';
        this.onChange(value);
        this.ngControl?.control?.markAsDirty();
        const card = validateCardNumber(value);
        if (card) {
            this.maxNumberLimit = Math.max(...card.length) + card.gaps.length;
            cardType = card.type;
        }
        this.cardNumber = this.prettyCardNumber(card, value);
        this.cardIcon = !value ? cardIcons.default : cardIcons[cardType];
    }

    private prettyCardNumber(card: any, cardNumber: string): string {
        if (card) {
            const offsets = [0].concat( card.gaps, cardNumber.length);
            const components = [];

            for (let i = 0; offsets[i] < cardNumber.length; i++) {
                const start = offsets[i];
                const end = Math.min(offsets[i + 1], cardNumber.length);
                components.push(cardNumber.substring(start, end));
            }
            return components.join(' ');
        }
        return cardNumber;
    }

    updateOnTouch(): void {
        if (this.ngControl) {
            this.onTouched(this.ngControl.control?.value);
            this.ngControl.control?.markAsTouched();
        }
    }
}
