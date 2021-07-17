import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AswCardCvv } from './card-cvv';
import { AswNumberOnly } from '@asoftwareworld/card-validator/core';

@NgModule({
    declarations: [
        AswCardCvv
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule
    ],
    exports: [
        AswCardCvv
    ]
})
export class AswCardCvvModule { }
