import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HuntListComponent } from './hunt-list/hunt-list.component';
import { HuntComponent } from './hunt-list/hunt/hunt.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ShinyHuntElectronService} from './service/shiny-hunt-electron.service';
import {NgxElectronModule} from 'ngx-electron';

@NgModule({
    declarations: [
        AppComponent,
        HuntListComponent,
        HuntComponent
    ],
    imports: [
        BrowserModule,
        FontAwesomeModule,
        NgxElectronModule
    ],
    providers: [
        ShinyHuntElectronService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
