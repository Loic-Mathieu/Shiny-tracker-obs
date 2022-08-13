import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hunt} from '../../models/hunt';
import {FileService} from '../../service/file.service';
import {FileType} from '../../options/fileType';
import {HuntListService} from '../hunt-list.service';
import {PokeApiService} from '../../service/pokeapi.service';
import StatisticUtils from '../../utils/statisticUtils';

@Component({
    selector: 'app-hunt',
    templateUrl: './hunt.component.html',
    styleUrls: ['./hunt.component.css']
})
export class HuntComponent implements OnInit {

    constructor(private huntService: HuntListService,
                private fileService: FileService,
                private pokeApiService: PokeApiService) {
    }

    @Input()
    hunt: Hunt;

    @Input()
    toggled: boolean;

    @Output()
    deleteEvent: EventEmitter<Hunt> = new EventEmitter<Hunt>();

    static copyToClipBoard(message: string): void {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = message;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    ngOnInit(): void {
    }

    public updateHunt(): void {
        Promise.all([
            this.fileService.write(this.hunt.name, FileType.ENCOUNTER_TRACKER, this.hunt.encounterNumber),
            this.fileService.write(this.hunt.name, FileType.ODDS, StatisticUtils.calculateProbability(this.hunt)),
            this.huntService.save(this.hunt)
        ])
            .then(result => console.log('OK'))
            .catch(error => console.error('BAAAD', error));
    }

    public onDelete(): void {
        this.deleteEvent.emit(this.hunt);
    }
}
