import { Component, OnInit } from '@angular/core';
import {Hunt} from './hunt/hunt';

@Component({
    selector: 'app-hunt-list',
    templateUrl: './hunt-list.component.html',
    styleUrls: ['./hunt-list.component.css']
})
export class HuntListComponent implements OnInit {

    hunts: Hunt[];

    constructor() { }

    ngOnInit(): void {
        this.initHunts();
    }

    // Temp
    private initHunts(): void {
        this.hunts = [
            {
                name: 'TEST-A',
                enabled: true,
                encounterNumber: 12,
                odds: 100
            },
            {
                name: 'TEST-B',
                enabled: true,
                encounterNumber: 60,
                odds: 100
            },
            {
                name: 'TEST-C',
                enabled: true,
                encounterNumber: 42,
                odds: 100
            },
        ];
    }
}
