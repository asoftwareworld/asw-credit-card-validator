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
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { CardCvvValidator } from '@asoftwareworld/card-validator/common';
import { CommonUtils } from '@asoftwareworld/card-validator/utils';

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
            useValue: CardCvvValidator,
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

    static nextId = 0;
    @Input() styleClass!: string;
    @Input()
    get value(): any {
        return this._value;
    }
    set value(cardNumber) {
        this._value = cardNumber;
        this.onChanges(cardNumber);
        this.stateChanges.next();
    }

    @Input()
    get placeholder(): string {
        return this._placeholder;
    }
    set placeholder(placeholder: string) {
        this._placeholder = placeholder;
        this.stateChanges.next();
    }

    @Input()
    get empty(): boolean {
        return !(!!this.cardCvv);
    }

    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(req: boolean) {
        this._required = coerceBooleanProperty(req);
        this.stateChanges.next();
    }

    @Input()
    get disabled(): boolean {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    set disabled(dis: boolean) {
        this._disabled = coerceBooleanProperty(dis);
        this.stateChanges.next();
    }

    // @Input()
    // get defaultStyles() {
    //     return this._defaultStyles;
    // }
    // set defaultStyles(val: any) {
    //     this._defaultStyles = coerceBooleanProperty(val);
    // }
    // tslint:disable-next-line: variable-name
    private _value: any;
    // tslint:disable-next-line: variable-name
    private _placeholder!: string;
    // tslint:disable-next-line: variable-name
    private _disabled = false;
    // tslint:disable-next-line: variable-name
    private _defaultStyles = false;
    // tslint:disable-next-line: variable-name
    private _required = false;
    ngControl: NgControl | null = null;
    focused = false;
    errorState = false;
    stateChanges = new Subject<void>();

    cardCvv = '';
    onChanges: any;
    onTouched: any;
    maxCvvLength = 4;

    @HostBinding() id = `asw-cc${AswCardCvv.nextId}`;
    @HostBinding('attr.aria-describedby') describedBy = '';
    @HostBinding('class.floating')
    get shouldLabelFloat(): boolean {
        return this.focused || !this.empty;
    }

    constructor(
        private injector: Injector,
        private elRef: ElementRef<HTMLElement>,
        private fm: FocusMonitor
    ) {
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

    ngDoCheck(): void {
        if (CommonUtils.card) {
            this.maxCvvLength = CommonUtils.card.size.length <= 1 ? CommonUtils.card.size[0] : CommonUtils.card.size[1];
        }
        if (this.ngControl) {
            this.errorState = this.ngControl.invalid && this.ngControl.touched ? true : false;
            this.stateChanges.next();
        }
    }

    writeValue(val: string): void {
        if (val) {
            this.cardCvv = val;
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
            this.elRef.nativeElement.querySelector('input')?.focus();
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
        this.fm.stopMonitoring(this.elRef.nativeElement);
        this.stateChanges.complete();
    }

}
