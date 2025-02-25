import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-justify',
    templateUrl: './justify.component.html',
    styleUrls: ['./justify.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class JustifyDialogComponent {

    action: string;
    justificationForm: FormGroup;
    title: string;
    lblInput: string
    lblButton: string
    iconButton: string
    mandatory: boolean;

    resummeCheckbox: string = 'ch_resumoAtendimento';
    checked: boolean = false;
    resumeOn;

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<JustifyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _translateService: TranslateService,
    ) {
        this.resumeOn = this._data.resumeMessage;
        this.resummeCheckbox = _data.resumeMessage ? _data.resumeMessage : this.resummeCheckbox;

        this.justificationForm = this.createJustifyForm();
        this.title = _data.title
        this.lblInput = _data.lblInput;
        this.lblButton = _data.lblButton
        this.iconButton = _data.iconButton
        this.mandatory = _data.mandatory;

    }

    /**
     * Create form
     *
     * @returns {FormGroup}
     */
    createJustifyForm(): FormGroup {
        return this._formBuilder.group({
            reproval_justification: new FormControl(null, Validators.required),
        });
    }

    refuse() {
        this.matDialogRef.close(this._data.resumeMessage ?
            ['yes', this.justificationForm.value.reproval_justification, this.checked == true ? true : null] :
            ['yes', this.justificationForm.value.reproval_justification]);
    }
    cancel() {
        this.matDialogRef.close(['no', this.justificationForm.value]);
    }
}
