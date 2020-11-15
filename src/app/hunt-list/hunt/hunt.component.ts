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

    constructor() { }

    ngOnInit(): void {
    }

}
