import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Hunt} from '../../../models/hunt';
import {HuntEditComponent} from '../hunt-edit/hunt-edit.component';

@Component({
    selector: 'app-hunt-create',
    templateUrl: './hunt-create.component.html',
    styleUrls: ['./hunt-create.component.css']
})
export class HuntCreateComponent implements OnInit {

    @ViewChild('editForm')
    private huntEditComponent: HuntEditComponent;

    constructor(private dialogRef: MatDialogRef<HuntCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private data) {
    }

    public get canBeSaved(): boolean {
        return this.huntEditComponent != null && this.huntEditComponent.valid;
    }

    public get hunt(): Hunt | null {
        return this.huntEditComponent.buildHunt();
    }

    ngOnInit(): void {
    }

    public save(): void {
        if (!this.canBeSaved) {
            return;
        }

        this.dialogRef.close({data: this.hunt});
    }

    public cancel(): void {
        this.huntEditComponent.form.reset();
        this.dialogRef.close();
    }
}
