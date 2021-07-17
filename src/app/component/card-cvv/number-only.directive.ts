import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[aswNumbersOnly]'
})
export class NumberDirective {
    @Input()
    get aswNumberOnly(): boolean {
        return this._aswNumberOnly;
    }

    set aswNumberOnly(flag: boolean) {
        this._aswNumberOnly = coerceBooleanProperty(flag);
    }
    @Input() aswMaxLength!: number;
    private _aswNumberOnly!: boolean;
    constructor(private elementRef: ElementRef<HTMLInputElement>) { }

    @HostListener('keydown', ['$event']) onKeyDown(event: Event): any {
        const initalValue = this.elementRef.nativeElement.value;
        this.elementRef.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
        if (initalValue !== this.elementRef.nativeElement.value) {
            event.stopPropagation();
            return;
        }
        if (this.aswMaxLength) {
            const value = (event.target as HTMLInputElement).value.replace(/\s/g, '').length;
            return (value < this.aswMaxLength);
        }
    }
}
