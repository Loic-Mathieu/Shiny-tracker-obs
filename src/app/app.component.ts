import { Component } from '@angular/core';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'StreamingShinyCounter';

    constructor(private library: FaIconLibrary) {
        library.addIconPacks(fas);
    }
}
