import {Component, OnInit, ViewChild} from '@angular/core';
import {Hunt} from '../models/hunt';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {HuntCreateComponent} from './hunt/hunt-create/hunt-create.component';
import {HuntListService} from './hunt-list.service';
import {MatAccordion} from '@angular/material/expansion';

@Component({
	selector: 'app-hunt-list',
	templateUrl: './hunt-list.component.html',
	styleUrls: ['./hunt-list.component.css']
})
export class HuntListComponent implements OnInit {

	@ViewChild(MatAccordion)
	accordion: MatAccordion;

	hunts: Hunt[];

	constructor(private huntService: HuntListService,
	            private dialog: MatDialog) {
	}

	ngOnInit(): void {
		this.initHunts();
	}

    public createHunt(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(HuntCreateComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (!result) {
                // TODO print warning message
                return;
            }

            this.huntService.save(result.data).then(newHunt => {
                if (newHunt instanceof Hunt) {
                    this.hunts.push(newHunt);
                } else {
                    // TODO display error
                }
            });
        });
    }

    public removeHunt(hunt: Hunt): void {
        if (!hunt) {
            // TODO print warning message
            return;
        }

        console.log(hunt);
        this.huntService.deleteHunt(hunt).then(response => {
            if (response) {
                this.initHunts();
            }
        });
    }

    public editHunt(hunt: Hunt): void {
        this.huntService.save(hunt).then(response => {
            if (response) {
                this.initHunts();
            }
        });
    }

    private initHunts(): void {
        this.hunts = [];
        this.huntService.getHunts().then(hunts => this.hunts = hunts);
    }
}
