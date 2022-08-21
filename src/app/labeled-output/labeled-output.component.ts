import {Component, Input, OnInit} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
	selector: 'app-labeled-output',
	templateUrl: './labeled-output.component.html',
	styleUrls: ['./labeled-output.component.scss']
})
export class LabeledOutputComponent implements OnInit {

	@Input()
	value: string | number;

	@Input()
	label: string;

	@Input()
	copyValue: string;

	@Input()
	secondary = false;

	constructor(private clipboard: Clipboard, private snackBar: MatSnackBar) {
	}

	public get isCopiable(): boolean {
		return this.copyValue != null;
	}

	ngOnInit(): void {
	}

	public copy(): void {
		if (!this.isCopiable) {
			return;
		}

		// TODO move this in custom service
		this.snackBar.open('Copied to clipboard !', 'OK', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'top'});
		this.clipboard.copy(this.copyValue);
	}
}
