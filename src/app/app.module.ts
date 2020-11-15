import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HuntListComponent } from './hunt-list/hunt-list.component';
import { HuntComponent } from './hunt-list/hunt/hunt.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        AppComponent,
        HuntListComponent,
        HuntComponent
    ],
    imports: [
        BrowserModule,
        FontAwesomeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
