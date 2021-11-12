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
    ElementRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl } from '@angular/forms';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { CardCvvService, CardCvvValidator } from '@asoftwareworld/card-validator/common';

@Component({
    selector: 'asw-card-cvv',
    templateUrl: './card-cvv.html',
    styleUrls: ['./card-cvv.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AswCardCvv),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => CardCvvValidator),
            multi: true
        },
        {
            provide: MatFormFieldControl,
            useExisting: forwardRef(() => AswCardCvv),
            multi: true
        }
    ]
})
export class AswCardCvv implements OnInit, OnDestroy, DoCheck, ControlValueAccessor, MatFormFieldControl<AswCardCvv> {

    @Input()
    get value(): any {
        return this.value$;
    }
    set value(cardNumber) {
        this.value$ = cardNumber;
        this.onChanges(cardNumber);
        this.stateChanges.next();
    }

    @Input()
    get placeholder(): string {
        return this.placeholder$;
    }
    set placeholder(placeholder: string) {
        this.placeholder$ = placeholder;
        this.stateChanges.next();
    }

    @Input()
    get empty(): boolean {
        return !(!!this.cardCvv);
    }

    @Input()
    get required(): boolean {
        return this.required$;
    }
    set required(req: boolean) {
        this.required$ = coerceBooleanProperty(req);
        this.stateChanges.next();
    }

    @Input()
    get disabled(): boolean {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this.disabled$;
    }
    set disabled(dis: boolean) {
        this.disabled$ = coerceBooleanProperty(dis);
        this.stateChanges.next();
    }

    static nextId = 0;

    private value$: any;
    private placeholder$!: string;
    private disabled$ = false;
    private required$ = false;

    cardCvv = '';
    onTouched: any;
    focused = false;
    maxCvvLength = 4;
    errorState = false;
    ngControl: NgControl | null = null;
    stateChanges = new Subject<void>();
    onChanges: any;

    @HostBinding() id = `asw-card-cvv-${AswCardCvv.nextId}`;
    @HostBinding('attr.aria-describedby') describedBy = '';
    @HostBinding('class.floating')
    get shouldLabelFloat(): boolean {
        return this.focused || !this.empty;
    }

    constructor(
        private injector: Injector,
        private elementRef: ElementRef<HTMLElement>,
        private focusMonitor: FocusMonitor,
        private cardCvvService: CardCvvService
    ) {
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
        if (this.cardCvvService.code) {
            this.maxCvvLength = this.cardCvvService.code.size.length <= 1
                ? this.cardCvvService.code.size[0] : this.cardCvvService.code.size[1];
        }
        if (this.ngControl) {
            this.errorState = this.ngControl.invalid && this.ngControl.touched ? true : false;
            this.stateChanges.next();
        }
    }

    writeValue(value: string): void {
        if (value) {
            this.cardCvv = value;
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

    updateCvv(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.cardCvv = value;
        this.onChanges(value);
        this.ngControl?.control?.markAsDirty();
    }

    updateOnTouch(): void {
        if (this.ngControl) {
            this.onTouched(this.ngControl.control?.value);
            this.ngControl.control?.markAsTouched();
        }
    }

    ngOnDestroy(): void {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
        this.stateChanges.complete();
    }
}
