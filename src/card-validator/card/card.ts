/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, DoCheck, ElementRef, forwardRef, HostBinding, Injector, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl, NG_VALIDATORS } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { CardCvvService, CardValidator, validateCardNumber } from '@asoftwareworld/card-validator/common';
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
    },
    {
        provide: NG_VALIDATORS,
        useValue: CardValidator,
        multi: true
    },
    {
        provide: MatFormFieldControl,
        useExisting: forwardRef(() => AswCard),
        multi: true
    }],
    encapsulation: ViewEncapsulation.None
})
export class AswCard implements OnInit, MatFormFieldControl<AswCard>, DoCheck, OnDestroy {

    @Input()
    get value(): any {
        return this.value$;
    }

    set value(cardNumber) {
        this.value$ = cardNumber;
        this.onChange(cardNumber);
        this.stateChanges.next();
    }

    @Input()
    get required(): boolean {
        return this.required$;
    }

    set required(requiredValue: boolean) {
        this.required$ = coerceBooleanProperty(requiredValue);
        this.stateChanges.next();
    }

    @Input()
    get disabled(): boolean {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this.disabled$;
    }
    set disabled(disabledValue: boolean) {
        this.disabled$ = coerceBooleanProperty(disabledValue);
        this.stateChanges.next();
    }

    @Input()
    get placeholder(): string {
        return this.placeholder$;
    }
    set placeholder(placeholderValue: string) {
        this.placeholder$ = placeholderValue;
        this.stateChanges.next();
    }

    @Input()
    get empty(): boolean {
        const value = this.cardNumber.replace(/\s/g, '');
        return !(!!value);
    }
    static nextId = 0;
    @Input() inputClass!: string;
    private value$: any;
    private required$ = false;
    private disabled$ = false;
    private placeholder$!: string;

    cardNumber = '';
    onTouched: any;
    focused = false;
    cardMaxlength = 19;
    cardIcon = cardIcons.default;
    errorState = false;
    ngControl: NgControl | null = null;
    stateChanges = new Subject<void>();
    onChange: any;

    @HostBinding() id = `asw-card-${AswCard.nextId}`;
    @HostBinding('attr.aria-describedByIds') describedByIds = '';
    @HostBinding('class.floating')
    get shouldLabelFloat(): boolean {
        return this.focused || !this.empty;
    }

    constructor(
        private injector: Injector,
        private elementRef: ElementRef<HTMLElement>,
        private focusMonitor: FocusMonitor,
        private cardCvvService: CardCvvService) {
        focusMonitor.monitor(elementRef.nativeElement, true).subscribe((origin: FocusOrigin) => {
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

    setDescribedByIds(ids: string[]): void {
        this.describedByIds = ids.join(' ');
    }

    onContainerClick(event: MouseEvent): void {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this.elementRef.nativeElement.querySelector('input')?.focus();
        }
    }

    updateIcon(event: Event): void {
        const value = (event.target as HTMLInputElement).value.replace(/\s/g, '');
        let cardType = 'default';
        this.onChange(value);
        this.ngControl?.control?.markAsDirty();
        const card = validateCardNumber(value);
        if (card) {
            this.cardMaxlength = Math.max(...card.length) + card.gaps.length;
            cardType = card.type;
            this.cardCvvService.code = card.code;
        }
        this.cardNumber = this.prettyCardNumber(card, value);
        this.cardIcon = !value ? cardIcons.default : cardIcons[cardType];
    }

    private prettyCardNumber(card: any, cardNumber: string): string {
        if (card) {
            const offsets = [0].concat(card.gaps, cardNumber.length);
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

    ngDoCheck(): void {
        if (this.ngControl) {
            this.errorState = (this.ngControl.invalid && this.ngControl.touched) ? true : false;
            this.stateChanges.next();
        }
    }

    ngOnDestroy(): void {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
        this.stateChanges.complete();
    }
}
