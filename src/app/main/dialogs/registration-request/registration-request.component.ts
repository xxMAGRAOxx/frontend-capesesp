import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'registration-request',
  templateUrl: './registration-request.component.html',
  styleUrls: ['./registration-request.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterRequestDialogComponent {

    action: string;
    registrationForm: FormGroup;
    reg: any

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<RegisterRequestDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _translateService: TranslateService,
    ) {
        this.reg = _data.registrationForm
        this.registrationForm = this.createRegistrationForm();
    }

    /**
     * Create form
     *
     * @returns {FormGroup}
     */
    createRegistrationForm(): FormGroup {
        return this._formBuilder.group({
            reason: this.reg.reason,
            registration_step: this.reg.registration_step,
            registration_status: this.reg.registration_status,
        });
    }

    confirm() {
        this.matDialogRef.close(['yes',this.registrationForm.value]);
    }
    cancel() {
        this.matDialogRef.close(['no',this.registrationForm.value]);
    }


}
