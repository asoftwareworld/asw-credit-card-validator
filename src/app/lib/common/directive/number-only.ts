/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { ElementRef, Directive, HostListener } from '@angular/core';

@Directive({
    selector: 'input[aswNumbersOnly]'
})
export class AswNumberOnly {
    constructor(private elementRef: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event: Event): void {
        const initalValue = this.elementRef.nativeElement.value;
        this.elementRef.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
        if (initalValue !== this.elementRef.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
