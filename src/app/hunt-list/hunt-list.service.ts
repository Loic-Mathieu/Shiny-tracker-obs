import { Injectable } from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {Hunt} from './hunt';

@Injectable({
	providedIn: 'root'
})
export class HuntListService {

	constructor(private electronServiceInstance: ElectronService) { }

	public addHunt(hunt: Hunt): Promise<boolean> {
		return new Promise<boolean>(resolve => {
			this.electronServiceInstance.ipcRenderer.send('POST_HUNT', {hunt});
			resolve(true);
		});
	}

	public save(hunt: Hunt): Promise<boolean> {
		return new Promise<boolean>(resolve => {
			this.electronServiceInstance.ipcRenderer.send('PUT_HUNT', {hunt});
			resolve(true);
		});
	}

	public getHunts(): Promise<Hunt[]> {
		return new Promise<Hunt[]>(resolve => {
			resolve(this.electronServiceInstance.ipcRenderer.sendSync('GET_HUNTS'));
		});
	}
}
