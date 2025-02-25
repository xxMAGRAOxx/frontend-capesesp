import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'payroll-deduction-export',
    templateUrl: './payroll-deduction-export.html',
    styleUrls: ['./payroll-deduction-export.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PayrollDeductionExportDialogComponent {
    image = '';
    message = '';
    title: string = 'lbl_selecioneIntegracao';
    buttonDownload: string = 'btn_gerarParaConferencia';
    buttonSendFTP: string = 'btn_enviarParaFTP';
    checked: boolean = false;
    withoutCancelButton: boolean = false;
    links: any[] = [];
    actionLink: any;
    messageBox: string = '';
    messageIcon: string = '';

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<PayrollDeductionExportDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private translate: TranslateService,
        private _formBuilder: FormBuilder,

    ) {
        this.message = _data.message;
    }

    download() {
        this.matDialogRef.close(['download']);
    }

    sendFTP() {
        this.matDialogRef.close(['sendFTP']);
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }
}
