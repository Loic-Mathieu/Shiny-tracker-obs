import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hunt} from '../../models/hunt';
import {FileService} from '../../service/file.service';
import {FileType} from '../../options/fileType';
import {HuntListService} from '../hunt-list.service';

@Component({
    selector: 'app-hunt',
    templateUrl: './hunt.component.html',
    styleUrls: ['./hunt.component.css']
})
export class HuntComponent implements OnInit {

    constructor(private huntService: HuntListService,
                private fileService: FileService) {
    }

    @Input()
    hunt: Hunt;

    @Input()
    toggled: boolean;

    @Output()
    editEvent: EventEmitter<Hunt> = new EventEmitter<Hunt>();

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

    /**
     * Shiny Pokémon = {1}
     * Non shiny Pokémon = {2, 3, 4, ..., <hunt.odds>}
     * P[Shiny] = 1 / <hunt.odds>
     * P[Non Shiny] = (1 - P[shiny])
     *
     * N = <hunt.encounterNumber>
     * P[Shiny] after N tries = 1 - (P[Non Shiny] ^ N)
     *
     * @return P[Shiny] after N tries, string format
     */
    calculateProbability(): string {
        const baseRate = (1 / this.hunt.odds);
        const shinyChances = (1 - Math.pow((1 - baseRate), this.hunt.encounterNumber));
        return (shinyChances * 100).toFixed(2);
    }

    public increaseEncounterNumber(): void {
        this.hunt.encounterNumber++;
        this.updateFiles();
    }

    public decreaseEncounterNumber(): void {
        this.hunt.encounterNumber--;
        this.updateFiles();
    }

    private updateFiles(): void {
        Promise.all([
            this.fileService.write(this.hunt.name, FileType.ENCOUNTER_TRACKER, this.hunt.encounterNumber),
            this.fileService.write(this.hunt.name, FileType.ODDS, this.calculateProbability()),
            this.huntService.save(this.hunt)
        ])
            .then(result => console.log('OK'))
            .catch(error => console.error('BAAAD', error));
    }

    public getEncounterPath(): void {
        this.fileService.getSavePath(this.hunt.name, FileType.ENCOUNTER_TRACKER).then(path => {
            HuntComponent.copyToClipBoard(path);
        });
    }

    public getChancesPath(): void {
        this.fileService.getSavePath(this.hunt.name, FileType.ODDS).then(path => {
            HuntComponent.copyToClipBoard(path);
        });
    }

    public onEdit(): void {
        this.editEvent.emit(this.hunt);
    }

    public onDelete(): void {
        this.deleteEvent.emit(this.hunt);
    }
}
