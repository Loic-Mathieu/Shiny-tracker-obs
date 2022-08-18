import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hunt} from '../../../models/hunt';

@Component({
	selector: 'app-hunt-options',
	templateUrl: './hunt-options.component.html',
	styleUrls: ['./hunt-options.component.css']
})
export class HuntOptionsComponent implements OnInit {

	@Input()
	hunt: Hunt;

	@Output()
	deleteEvent: EventEmitter<Hunt> = new EventEmitter<Hunt>();

	@Output()
	editEvent: EventEmitter<Hunt> = new EventEmitter<Hunt>();

	constructor() {
	}

	ngOnInit(): void {
	}

	public deleteAction(): void {
		this.deleteEvent.emit(this.hunt);
	}

	public editAction(): void {
		// TODO display confirmation window
		this.editEvent.emit(this.hunt);
	}

}
