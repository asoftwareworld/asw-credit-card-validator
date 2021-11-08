import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AswCardModule } from '@asoftwareworld/card-validator/card';
import { AswCardCvvModule } from '@asoftwareworld/card-validator/card-cvv';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AswCardModule,
        AswCardCvvModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
