import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'enrollment-period-reopen-email',
    templateUrl: './enrollment-period-reopen-email.component.html',
    styleUrls: ['./enrollment-period-reopen-email.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EnrollmentPeriodReopenEmailDialogComponent {
    image = '';
    message = '';
    title: string = 'btn_ResendEmail';
    buttonSendToAllAgain: string = 'lbl_enviarNovamenteTodos';
    buttonSendToNotReceived: string = 'lbl_enviarNovamenteSomenteQuemNaoRecebeu';
    buttonDoNotSend: string = 'lbl_naoEnviar';
    checked: boolean = false;
    withoutCancelButton: boolean = false;
    links: any[] = [];
    actionLink: any;
    messageBox: string = '';
    messageIcon: string = '';
    dataForm: FormGroup;

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<EnrollmentPeriodReopenEmailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private translate: TranslateService,
        private _formBuilder: FormBuilder,

    ) {
        this.message = _data.message;
        this.dataForm = this._formBuilder.group({
            resendEmailType: new FormControl('', Validators.required)
        });

        this.matDialogRef.backdropClick().subscribe(() => {
            this.cancel();
        });
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

    confirm() {
        let resendEmailType = this.dataForm.get('resendEmailType').value;
        resendEmailType = resendEmailType === 'lbl_enviarNovamenteTodos' ? 'SEND_TO_EVERYONE' : resendEmailType === 'lbl_enviarNovamenteSomenteQuemNaoRecebeu' ? 'SEND_TO_THOSE_ONLY_NOT_RECEIVED' : 'DO_NOT_SEND';
        this.matDialogRef.close([resendEmailType]);
    }
}
