import { ElementRef, Directive, Input, HostListener } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
    selector: 'input[aswNumbersOnly]'
})
export class AswNumberOnly {

    @Input()
    get aswNumberOnly(): boolean {
        return this._aswNumberOnly;
    }

    set aswNumberOnly(flag: boolean) {
        this._aswNumberOnly = coerceBooleanProperty(flag);
    }

    @Input() aswMaxLength!: number;

    private _aswNumberOnly!: boolean;

    constructor(private elementRef: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event: Event): boolean {
        const initalValue = this.elementRef.nativeElement.value;
        this.elementRef.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
        if (initalValue !== this.elementRef.nativeElement.value) {
            event.stopPropagation();
        }

        if (this.elementRef.nativeElement.value.length < this.aswMaxLength) {
            return true;
        }
        return false;
    }
}
