import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ConfirmDialogComponent {
    image = '';
    message = '';
    title: string = 'msg_confirmacao';
    buttonConfirm: string = 'btn_sim';
    buttonCancel: string = 'btn_cancelar';
    resummeCheckbox: string = 'ch_resumoAtendimento';
    checked: boolean = false;
    resumeOn;
    justificationForm: FormGroup;
    justification: boolean;
    lblInput: string;
    withoutCancelButton: boolean = false;
    links: any[] = [];
    actionLink: any;
    messageBox: string = '';
    messageIcon: string = '';

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private translate: TranslateService,
        private _formBuilder: FormBuilder,

    ) {
        this.resumeOn = this._data.resumeMessage;
        this.message = _data.message;
        if (_data.image) {
            this.image = _data.image;
        }
        if (_data.title) {
            this.title = _data.title;
        }
        if (_data.links) {
            this.links = _data.links;
        }
        if (_data.actionLink) {
            this.actionLink = _data.actionLink;
        }
        if (_data.withoutCancelButton) {
            this.withoutCancelButton = _data.withoutCancelButton;
        }
        if (_data.messageBox) {
            this.messageBox = _data.messageBox;
        }
        if (_data.messageIcon) {
            this.messageIcon = _data.messageIcon;
        }
        this.buttonConfirm = _data.buttonConfirm ? _data.buttonConfirm : this.buttonConfirm;
        this.buttonCancel = _data.buttonCancel ? _data.buttonCancel : this.buttonCancel;
        this.resummeCheckbox = _data.resumeMessage ? _data.resumeMessage : this.resummeCheckbox;
        this.justification = _data.justification;
        if (this.justification) {
            this.justificationForm = this.createJustifyForm();
            this.justificationForm.markAllAsTouched();
        }
        this.lblInput = _data.lblInput;
    }

    confirm() {
        this.matDialogRef.close(['yes', this.checked == true ? true : null, this.justificationForm?.get('justification').value ? this.justificationForm?.get('justification').value : null]);
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

    /**
     * Create form
     *
     * @returns {FormGroup}
     */
    createJustifyForm(): FormGroup {
        return this._formBuilder.group({
            justification: new FormControl(null, Validators.required),
        });
    }

}
