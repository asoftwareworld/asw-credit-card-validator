import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AswCardCvvModule } from '@asoftwareworld/card-validator/card-cvv';
import { AswCardModule } from '@asoftwareworld/card-validator/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
