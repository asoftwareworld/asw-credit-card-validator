import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AswNumberOnly } from '@asoftwareworld/card-validator/core';
import { AswCard } from './card';

@NgModule({
    declarations: [
        AswNumberOnly,
        AswCard
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule
    ],
    exports: [
        AswCard,
        AswNumberOnly
    ]
})
export class AswCardModule { }
