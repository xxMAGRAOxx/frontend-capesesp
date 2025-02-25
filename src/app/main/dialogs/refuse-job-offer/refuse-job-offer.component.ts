import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'refuse-job-offer-dialog',
    templateUrl: './refuse-job-offer.component.html',
    styleUrls: ['./refuse-job-offer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RefuseJobOfferDialogComponent {

    action: string;
    justificationForm: FormGroup;
    reg: any

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<RefuseJobOfferDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _translateService: TranslateService,
    ) {
        this.reg = _data.justificationForm
        this.justificationForm = this.createJustifyForm();
    }

    /**
     * Create form
     *
     * @returns {FormGroup}
     */
    createJustifyForm(): FormGroup {
        return this._formBuilder.group({
            justification: [this.reg.justification, Validators.required],
        });
    }

    refuse() {
        this.matDialogRef.close(['yes', this.justificationForm.value]);
    }
    cancel() {
        this.matDialogRef.close(['no', this.justificationForm.value]);
    }


}
