import {Component, Input, OnInit} from '@angular/core';
import {Hunt} from './hunt';

@Component({
    selector: 'app-hunt',
    templateUrl: './hunt.component.html',
    styleUrls: ['./hunt.component.css']
})
export class HuntComponent implements OnInit {

    @Input()
    hunt: Hunt;

    @Input()
    toggled: boolean;

    constructor() { }

    ngOnInit(): void {
    }

    /**
     * Shiny Pokémon = {1}
     * P[Shiny] = 1 / <hunt.odds>
     * Non shiny Pokémon = {2, 3, 4, ..., <hunt.odds>}
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
}
