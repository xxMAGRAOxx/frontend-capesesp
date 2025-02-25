import { ChangeDetectorRef, Component, Inject, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ValidatorUtils } from 'utils/validatorutils';

@Component({
    selector: 'app-confirm-refund',
    templateUrl: './confirm-refund.component.html',
    styleUrls: ['./confirm-refund.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ConfirmRefundDialogComponent {

    dataForm: FormGroup;
    justificationForm: FormGroup;
    lblInput: string
    justification: boolean;

    refundDate: any;
    refundValue: number;

    resummeCheckbox: string = 'ch_resumoAtendimento';
    resumeOn;
    approveWithChanges: boolean;
    dialogRef: any;


    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<ConfirmRefundDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private translate: TranslateService,
        private _cd: ChangeDetectorRef,
        private _validatorUtils: ValidatorUtils

    ) {
        this.resumeOn = this._data.resumeMessage;
        this.resummeCheckbox = _data.resumeMessage ? _data.resumeMessage : this.resummeCheckbox;
        this.dataForm = _data.refundData;
        this.refundDate = this.dataForm?.controls.reference.value;
        this.refundValue = this.dataForm?.controls.refund_value.value;

        this.lblInput = _data.lblInput;
        this.justification = false;

        this.dataForm.get('refund_value').setValidators(
            (control: AbstractControl) => this._validatorUtils.valueInterval(0, this.dataForm.get('refund_value').value, false)(control))

        this.dataForm.get('refund_value').valueChanges.subscribe((val) => {
            if (val !== this.refundValue) {
                this.dataForm.get('justification').setValidators(Validators.required);
                this.justification = true;
                this.dataForm.get('justification').markAllAsTouched();
            } else {
                this.dataForm.get('justification').clearValidators();
                this.justification = false;
                this.dataForm.get('justification').setValue(null);
            }
            this._cd.detectChanges();
        });
        this.dataForm.get('reference').valueChanges.subscribe((val) => {
            if (moment(val).format('MM/YYYY') !== moment(this.refundDate).format('MM/YYYY')) {
                this.dataForm.get('justification').setValidators(Validators.required);
                this.justification = true;
                this.dataForm.get('justification').markAllAsTouched();
            } else {
                this.dataForm.get('justification').clearValidators();
                this.justification = false;
                this.dataForm.get('justification').setValue(null);
            }
            this._cd.detectChanges();
        });
    }

    confirm() {
        this.matDialogRef.close(['yes', this._data.resumeMessage ? this.dataForm.value.send_summary : null]);
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }
}
