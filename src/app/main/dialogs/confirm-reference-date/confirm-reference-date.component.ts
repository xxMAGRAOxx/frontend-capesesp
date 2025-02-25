import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ConfirmDialogComponent } from '../confirm/confirm.component';
import { GeneralServices } from 'services/general.service';

@Component({
    selector: 'app-confirm-reference-date',
    templateUrl: './confirm-reference-date.component.html',
    styleUrls: ['./confirm-reference-date.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ConfirmReferenceDateComponent {

    formGroup: FormGroup;
    layout: string;
    maxDay: string;
    flashD: moment.MomentInput;
    lastDayofCurrentMonth: number;

    currentYear = new Date().getFullYear();
    currentMonth = new Date().getMonth();
    currentDay = new Date().getDate();

    minDate: Date;
    minDateBillet: Date;
    maxDate: Date;

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _translateService: TranslateService,
        private _generalServices: GeneralServices,
    ) {
        this.formGroup = _data.form;
        this.layout = _data.layout
    }



    ngOnInit(): void {
        if (this.layout === 'FLASH_WS') {
            this._generalServices.getMinDate(3).subscribe(data => {
                if (data.status == 200) {
                    this.minDateBillet = data.min_date;
                    this.minDate = this.minDateBillet;
                }
            });
            this.formGroup.get('payment').valueChanges.subscribe(() => {
                if (this.formGroup.get('payment').value === 'billet') {
                    this.minDate = this.minDateBillet;
                }
                else {
                    this.filterDate(moment().format('DD'));
                }
            });
        } else if (this.layout === 'MAISVT_WS') {
            this.formGroup.get('type').valueChanges.subscribe(() => {
                if (this.formGroup.get('type').value === 'API') {
                    this.formGroup.get('credit_date').setValidators([Validators.required]);
                    this.formGroup.get('order_type').setValidators([Validators.required]);
                    this.formGroup.get('line_type').clearValidators();
                    this.formGroup.get('one_file_per_company').setValidators([Validators.required]);
                    this.formGroup.get('send_branches').setValidators([Validators.required]);
                } else {
                    this.formGroup.get('credit_date').clearValidators();
                    this.formGroup.get('order_type').clearValidators();
                    this.formGroup.get('line_type').setValidators([Validators.required]);
                    this.formGroup.get('one_file_per_company').setValidators([Validators.required]);
                    this.formGroup.get('send_branches').setValidators([Validators.required]);
                }
                this.formGroup.get('credit_date').updateValueAndValidity();
                this.formGroup.get('order_type').updateValueAndValidity();
                this.formGroup.get('line_type').updateValueAndValidity();
                this.formGroup.get('one_file_per_company').updateValueAndValidity();
                this.formGroup.get('send_branches').updateValueAndValidity();
            });
            this.filterDate(moment().format('DD'));
        }
        else if (this.layout === 'UNIMED_SEGUROS') {
            this.minDate = null;
        }
        else {
            this.filterDate(moment().format('DD'));
        }
    }

    filterDate(dayFiltered) {
        this.minDate = new Date(this.currentYear, this.currentDay > dayFiltered ? this.currentMonth + 1 : this.currentMonth, dayFiltered);
    }

    confirm() {
        this.matDialogRef.close(['yes']);
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

}
