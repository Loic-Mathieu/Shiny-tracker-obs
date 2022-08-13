import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hunt} from '../../../models/hunt';
import StatisticUtils from '../../../utils/statisticUtils';

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

  constructor() {
  }

  public get probability(): string {
    return StatisticUtils.calculateProbability(this.hunt);
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

  public getEncounterPath(): void {
    // TODO rework
  }

  public getChancesPath(): void {
    // TODO rework
  }
}
