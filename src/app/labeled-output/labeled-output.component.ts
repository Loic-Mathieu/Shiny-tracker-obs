import {Component, Input, OnInit} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';

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

	constructor(private clipboard: Clipboard) {
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

		// TODO print success message
		this.clipboard.copy(this.copyValue);
	}
}
