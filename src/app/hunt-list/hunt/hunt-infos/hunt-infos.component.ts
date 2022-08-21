import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hunt} from '../../../models/hunt';
import StatisticUtils from '../../../utils/statisticUtils';
import {FileService} from '../../../service/file.service';
import {FileType} from '../../../options/fileType';
import {MatSnackBar} from '@angular/material/snack-bar';
import SpriteUtils from '../../../utils/spriteUtils';

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

	constructor(private fileService: FileService, private snackBar: MatSnackBar) {
	}

	public get sprite(): string {
		return this.hunt.pokemonSprite ?? SpriteUtils.DEFAULT_SPRITE;
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
		// TODO use same method as in labeled output, this is called as render and will print 3x / second
		// this.snackBar.open('Copied to clipboard 2!', null, {duration: 3000, horizontalPosition: 'center', verticalPosition: 'top'});
		return source;
	}
}
