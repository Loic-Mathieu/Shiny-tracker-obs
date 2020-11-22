import { Component, OnInit } from '@angular/core';
import {Hunt} from './hunt';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {HuntCreateComponent} from './hunt-create/hunt-create.component';

@Component({
    selector: 'app-hunt-list',
    templateUrl: './hunt-list.component.html',
    styleUrls: ['./hunt-list.component.css']
})
export class HuntListComponent implements OnInit {

    hunts: Hunt[];

    constructor(private dialog: MatDialog) { }

    ngOnInit(): void {
        this.initHunts();
    }

    public createHunt(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(HuntCreateComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            this.hunts.push(result.data);
        });
    }

    private initHunts(): void {
        this.hunts = [];
    }
}
