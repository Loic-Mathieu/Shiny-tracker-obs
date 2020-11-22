import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Hunt} from '../hunt';

@Component({
    selector: 'app-hunt-create',
    templateUrl: './hunt-create.component.html',
    styleUrls: ['./hunt-create.component.css']
})
export class HuntCreateComponent implements OnInit {

    form: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private dialogRef: MatDialogRef<HuntCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private data) {
    }

    ngOnInit(): void {

        this.form = this.formBuilder.group({
            name: [],
            generation: [],
            encounters: [],
            odds: [],
        });
    }

    public save(): void {
        const hunt = new Hunt();
        hunt.name = this.form.get('name').value;
        hunt.encounterNumber = (this.form.get('encounters').value && this.form.get('encounters').valid)
            ? this.form.get('encounters').value
            : 0;
        hunt.odds = this.form.get('odds').value;

        hunt.enabled = true;

        this.dialogRef.close({data: hunt});
    }

    public cancel(): void {
        this.form.reset();
        this.dialogRef.close();
    }

}
