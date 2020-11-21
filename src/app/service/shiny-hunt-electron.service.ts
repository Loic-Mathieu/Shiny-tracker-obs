import { Injectable } from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {IpcRenderer} from 'electron';

@Injectable({
  providedIn: 'root'
})
export class ShinyHuntElectronService {


    constructor(private electronServiceInstance: ElectronService) {
    }

    public testCall(path): void {
        console.log(this.electronServiceInstance);
        this.electronServiceInstance.ipcRenderer.send('TEST_URI', path);
    }


}
