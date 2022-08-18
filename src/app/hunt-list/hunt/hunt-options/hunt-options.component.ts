import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Hunt} from '../../../models/hunt';
import {HuntEditComponent} from '../hunt-edit/hunt-edit.component';

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

	@ViewChild('editForm')
	private huntEditComponent: HuntEditComponent;

	constructor() {
	}

	ngOnInit(): void {
	}

	public get canUpdate(): boolean {
		return this.huntEditComponent != null && this.huntEditComponent.valid;
	}

	public get canInteract(): boolean {
		return this.huntEditComponent != null && !this.huntEditComponent.isLoading;
	}

	public deleteAction(): void {
		// TODO display confirmation window
		this.deleteEvent.emit(this.hunt);
	}

	public editAction(): void {
		// TODO display confirmation window
		this.editEvent.emit(this.huntEditComponent.buildHunt());
	}

	public eraseAction(): void {
		// TODO display confirmation window
		// TODO update form control too
		this.hunt.encounterNumber = 0;
		this.editEvent.emit(this.hunt);
	}

}
