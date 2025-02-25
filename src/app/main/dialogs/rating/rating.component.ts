import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ValidatorUtils } from 'utils/validatorutils';
import { ConfirmDialogComponent } from '../confirm/confirm.component';

@Component({
    selector: 'rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class RatingComponent {

    buttonConfirm: string = 'btn_salvar';
    buttonCancel: string = 'btn_cancelar';
    title: string = 'lbl_avaliar';
    onlyView: boolean;

    dataForm: FormGroup;

    stars: number[] = [1, 2, 3, 4, 5];
    selectedValue: number;

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<ConfirmDialogComponent>,
        private _formBuilder: FormBuilder,
        private _validatorUtils: ValidatorUtils,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private translate: TranslateService,
    ) {
        this.buttonConfirm = _data.buttonConfirm ? _data.buttonConfirm : this.buttonConfirm;
        this.buttonCancel = _data.buttonCancel ? _data.buttonCancel : this.buttonCancel;
        this.title = _data.title ? _data.title : this.title;
        this.onlyView = _data.onlyView
        this.dataForm = this.openForm();
        if (this.onlyView) {
            this.dataForm.get('rating').setValue(_data.rating)
            this.dataForm.get('rating_justification').setValue(_data.rating_justification)
            this.selectedValue = _data.rating ? _data.rating : 0;
        }
    }

    openForm() {
        let form = this._formBuilder.group({
            rating: new FormControl(null, [Validators.required]),
            rating_justification: new FormControl(null, [this._validatorUtils.requiredIf(() => this.dataForm.get('rating').value <= 3)])
        })
        return form
    }

    saveRating(event) {
        if (!this.onlyView) {
            this.selectedValue = parseInt(event.target.id);
            this.dataForm.get('rating').patchValue(this.selectedValue);
            this.dataForm.get('rating_justification').updateValueAndValidity();
            this.dataForm.markAllAsTouched();
        }
    }

    confirm() {
        this.matDialogRef.close(['yes', this.selectedValue, this.dataForm.value]);
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

}