import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HuntListComponent} from './hunt-list/hunt-list.component';
import {HuntComponent} from './hunt-list/hunt/hunt.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgxElectronModule} from 'ngx-electron';
import {HuntCreateComponent} from './hunt-list/hunt/hunt-create/hunt-create.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {HttpClientModule} from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatOptionModule} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {HuntInfosComponent} from './hunt-list/hunt/hunt-infos/hunt-infos.component';
import {HuntOptionsComponent} from './hunt-list/hunt/hunt-options/hunt-options.component';
import {HuntEditComponent} from './hunt-list/hunt/hunt-edit/hunt-edit.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {OptionsScrollDirective} from './directives/options-scroll.directive';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ClipboardModule} from '@angular/cdk/clipboard';

@NgModule({
	declarations: [
		AppComponent,
		HuntListComponent,
		HuntComponent,
		HuntCreateComponent,
		HuntInfosComponent,
		HuntOptionsComponent,
		HuntEditComponent,
		OptionsScrollDirective
	],
	imports: [
		BrowserModule,
		FontAwesomeModule,
		NgxElectronModule,
		MatDialogModule,
		BrowserAnimationsModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatExpansionModule,
		MatToolbarModule,
		MatTabsModule,
		HttpClientModule,
		MatAutocompleteModule,
		MatOptionModule,
		MatDividerModule,
		MatGridListModule,
		MatButtonToggleModule,
		MatCardModule,
		MatListModule,
		MatProgressSpinnerModule,
		MatProgressBarModule,
		MatSlideToggleModule,
		ClipboardModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
