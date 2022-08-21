import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hunt} from '../../../models/hunt';
import StatisticUtils from '../../../utils/statisticUtils';
import {FileService} from '../../../service/file.service';
import {FileType} from '../../../options/fileType';

@Component({
	selector: 'app-hunt-infos',
	templateUrl: './hunt-infos.component.html',
	styleUrls: ['./hunt-infos.component.css']
})
export class HuntInfosComponent implements OnInit {

	@Input()
	hunt: Hunt;

	@Output()
	editEvent: EventEmitter<Hunt> = new EventEmitter<Hunt>();

	constructor(private fileService: FileService) {
	}

	public get probability(): string {
		// TODO use directive
		return StatisticUtils.calculateProbability(this.hunt) + '%';
	}

	public get odds(): string {
		// TODO use directive
		return '1 / ' + this.hunt.odds;
	}

	public get getEncounterPath(): string {
		return this.fileService.getSavePath(this.hunt.name, FileType.ENCOUNTER_TRACKER);
	}

	public get getChancesPath(): string {
		return this.fileService.getSavePath(this.hunt.name, FileType.ODDS);
	}

	ngOnInit(): void {
	}

	public increaseEncounterNumber(): void {
		this.hunt.encounterNumber++;
		this.editEvent.emit(this.hunt);
	}

	public decreaseEncounterNumber(): void {
		if (this.hunt.encounterNumber === 0) {
			return;
		}
		this.hunt.encounterNumber--;
		this.editEvent.emit(this.hunt);
	}

	public copyToClipboard(source: string): string {
		// TODO display message
		return source;
	}
}
