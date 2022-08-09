import {Component, OnInit} from '@angular/core';
import {Hunt} from '../models/hunt';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {HuntCreateComponent} from './hunt-create/hunt-create.component';
import {HuntListService} from './hunt-list.service';

@Component({
    selector: 'app-hunt-list',
    templateUrl: './hunt-list.component.html',
    styleUrls: ['./hunt-list.component.css']
})
export class HuntListComponent implements OnInit {

    hunts: Hunt[];

    constructor(private huntService: HuntListService,
                private dialog: MatDialog) { }

    ngOnInit(): void {
        this.initHunts();
    }

    public createHunt(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(HuntCreateComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            this.huntService.save(result.data).then(newHunt => {
                if (newHunt instanceof Hunt) {
                    this.hunts.push(newHunt);
                } else {
                    // TODO display error
                }
            });
        });
    }

    public removeHunt(): void {
        this.huntService.deleteHunt(null).then(response => {
            if (response) {

            }
        });
    }

    private initHunts(): void {
        this.hunts = [];
        this.huntService.getHunts().then(hunts => this.hunts = hunts);
    }
}
