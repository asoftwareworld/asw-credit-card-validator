/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import {
    Component,
    HostBinding,
    Input,
    Injector,
    OnInit,
    OnDestroy,
    DoCheck,
    forwardRef,
    ViewEncapsulation,
    ElementRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl } from '@angular/forms';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { CardExpirationValidator } from '@asoftwareworld/card-validator/common';

@Component({
    selector: 'asw-card-date',
    templateUrl: './card-date.html',
    styleUrls: ['./card-date.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AswCardDate),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useValue: CardExpirationValidator,
            multi: true
        },
        {
            provide: MatFormFieldControl,
            useExisting: AswCardDate,
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class AswCardDate implements OnInit, OnDestroy, DoCheck, ControlValueAccessor, MatFormFieldControl<AswCardDate> {
    static nextId = 0;
    ngControl: NgControl | null = null;
    focused = false;
    errorState = false;
    stateChanges = new Subject<void>();
    cardDate = '';
    onChanges: any;
    onTouched: any;

    @Input() aswInputClass?: string;
    @Input()
    get value(): any {
        return this.value$;
    }
    set value(cardDate) {
        this.value$ = cardDate;
        this.onChanges(cardDate);
        this.stateChanges.next();
    }
    private value$: any;

    @Input()
    get placeholder(): string {
        return this.placeholder$;
    }
    set placeholder(placeholder: string) {
        this.placeholder$ = placeholder;
        this.stateChanges.next();
    }
    private placeholder$!: string;

    @Input()
    get empty(): boolean {
        return !(!!this.cardDate);
    }

    @Input()
    get required(): boolean {
        return this.required$;
    }
    set required(req: BooleanInput) {
        this.required$ = coerceBooleanProperty(req);
        this.stateChanges.next();
    }
    private required$ = false;

    @Input()
    get disabled(): boolean {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this.disabled$;
    }
    set disabled(value: BooleanInput) {
        this.disabled$ = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private disabled$ = false;

    @HostBinding() id = `asw-card-date-${AswCardDate.nextId}`;
    @HostBinding('attr.aria-describedby') describedBy = '';
    @HostBinding('class.floating')
    get shouldLabelFloat(): boolean {
        return this.focused || !this.empty;
    }

    constructor(
        private injector: Injector,
        private elementRef: ElementRef<HTMLElement>,
        private focusMonitor: FocusMonitor) {
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

    ngDoCheck(): void {
        if (this.ngControl) {
            this.errorState = this.ngControl.invalid && this.ngControl.touched ? true : false;
            this.stateChanges.next();
        }
    }

    writeValue(value: string): void {
        if (value) {
            this.cardDate = value;
        }
    }

    registerOnChange(fn: any): void {
        this.onChanges = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDescribedByIds(ids: string[]): void {
        this.describedBy = ids.join(' ');
    }

    onContainerClick(event: MouseEvent): void {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this.elementRef.nativeElement.querySelector('input')?.focus();
        }
    }

    updateDate(): void {
        if (this.ngControl) {
            console.log(this.ngControl.control?.value);
            this.onChanges(this.ngControl.control?.value);
            this.ngControl.control?.markAsDirty();
            this.cardDate = this.ngControl.control?.value;
        }
    }

    updateOnTouch(): void {
        if (this.ngControl) {
            this.onTouched(this.ngControl.control?.value);
            this.ngControl.control?.markAsTouched();
            this.cardDate = this.ngControl.control?.value;
        }
    }

    ngOnDestroy(): void {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
        this.stateChanges.complete();
    }
}
