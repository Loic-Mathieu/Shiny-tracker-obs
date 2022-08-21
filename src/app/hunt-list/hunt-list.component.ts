import {Component, OnInit, ViewChild} from '@angular/core';
import {Hunt} from '../models/hunt';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {HuntCreateComponent} from './hunt/hunt-create/hunt-create.component';
import {HuntListService} from './hunt-list.service';
import {MatAccordion} from '@angular/material/expansion';
import {ElectronService} from 'ngx-electron';

@Component({
	selector: 'app-hunt-list',
	templateUrl: './hunt-list.component.html',
	styleUrls: ['./hunt-list.component.css']
})
export class HuntListComponent implements OnInit {

	@ViewChild(MatAccordion)
	accordion: MatAccordion;

	hunts: Hunt[];

	loading = false;

	constructor(private huntService: HuntListService,
	            private electronServiceInstance: ElectronService,
	            private dialog: MatDialog) {
	}

	ngOnInit(): void {
		this.initHunts();
	}

	public get isAtLeastOneHunt(): boolean {
		return this.hunts != null && this.hunts.length > 0 && !this.loading;
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

		this.huntService.deleteHunt(hunt).then(response => {
			if (response) {
				this.initHunts();
			}
		});
	}

	// TODO move this in proper service
	public openTutorial(): void {
		this.electronServiceInstance.ipcRenderer.sendSync('OPEN_LINK', {link: 'https://youtu.be/dQw4w9WgXcQ'});
	}

	private initHunts(): void {
		this.loading = true;
		this.hunts = [];
		this.huntService.getHunts().then(hunts => {
			this.hunts = hunts;
			this.loading = false;
		});
	}
}
