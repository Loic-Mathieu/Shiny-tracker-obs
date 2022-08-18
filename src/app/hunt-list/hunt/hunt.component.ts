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

    // TODO either put this in utils or check material alternative
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
        // TODO use a directive to display start date
        // Load first data
        this.pokeApiService.findPokemonList();
    }

    public updateHunt(): void {
        Promise.all([
            this.fileService.write(this.hunt.name, FileType.ENCOUNTER_TRACKER, this.hunt.encounterNumber),
            this.fileService.write(this.hunt.name, FileType.ODDS, StatisticUtils.calculateProbability(this.hunt)),
            this.huntService.save(this.hunt)
        ])
            .then(result => console.log('OK'))
            .catch(error => console.error('BAAAD', error)); // TODO handle this properly
    }

    public onDelete(): void {
        this.deleteEvent.emit(this.hunt);
    }

    public onEdit(hunt: Hunt): void {
        this.huntService.save(hunt).then(updatedHunt => {
            if (!updatedHunt) {
                // TODO display error message
                return;
            }

            this.hunt = updatedHunt;
            this.updateHunt();
        });
    }
}
