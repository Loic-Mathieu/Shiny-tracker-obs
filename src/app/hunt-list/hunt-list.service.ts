import {Injectable} from '@angular/core';
import {Hunt} from '../models/hunt';
import {DatabaseService} from '../service/database.service';

@Injectable({
	providedIn: 'root'
})
export class HuntListService {

	constructor(private databaseService: DatabaseService) {
	}

	public save(hunt: Hunt): Promise<void | Hunt> {
		return this.databaseService.connection.then(() => {
			return hunt.save().then(response => response);
		});
	}

	public getHunts(): Promise<Hunt[]> {
		return this.databaseService.connection.then(() => {
			return Hunt.find();
		});
	}

	public deleteHunt(hunt: Hunt): Promise<boolean> {
		return this.databaseService.connection.then(() => {
			return hunt.remove().then(response => true);
		});
	}
}
