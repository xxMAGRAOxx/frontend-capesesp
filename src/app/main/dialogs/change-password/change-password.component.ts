import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { TranslateService } from '@ngx-translate/core';
import { GeneralServices } from 'services/general.service';
import { ValidatorUtils } from 'utils/validatorutils';
import { User } from '../../../model/User';

@Component({
    selector: 'change-password-dialog',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ChangePasswordDialogComponent {
    action: string;
    user: User;
    changePasswordForm: FormGroup;
    dialogTitle: string;

    processing = false;

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<ChangePasswordDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _generalServices: GeneralServices,
        private _snackBar: MatSnackBar,
        private _translateService: TranslateService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _validatorUtils: ValidatorUtils
    ) {
        // Set the defaults
        this.user = _data.user;

        this.changePasswordForm = this.createContactForm();
    }

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup {
        return this._formBuilder.group({
            password: ['', [Validators.required, this._validatorUtils.strongPassword]],
            password_confirmation: ['', [Validators.required]],
        }, { validators: this._validatorUtils.formCheckMatchPasswords });
    }

    save() {
        this.processing = true;
        this._fuseProgressBarService.show();

        this._generalServices.setPassword(this.user.type, this.user.id, this.changePasswordForm.controls.password.value).subscribe(data => {
            if (data.status == 200) {
                this._snackBar.open(this._translateService.instant('msg_senhaSalvaSucesso'), 'X', { panelClass: 'success-snackbar' });
            }
            this.processing = false;
            this._fuseProgressBarService.hide();
        }, error => {
            this._snackBar.open(this._translateService.instant('msg_erroPadrao'), 'X', { duration: 60000, panelClass: 'error-snackbar' });
            this.processing = false;
            this._fuseProgressBarService.hide();
        });

        this.matDialogRef.close(['send']);
    }
}