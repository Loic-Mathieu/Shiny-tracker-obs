import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HuntListComponent } from './hunt-list/hunt-list.component';
import { HuntComponent } from './hunt-list/hunt/hunt.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgxElectronModule} from 'ngx-electron';
import { HuntCreateComponent } from './hunt-list/hunt-create/hunt-create.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        HuntListComponent,
        HuntComponent,
        HuntCreateComponent
    ],
    imports: [
        BrowserModule,
        FontAwesomeModule,
        NgxElectronModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
