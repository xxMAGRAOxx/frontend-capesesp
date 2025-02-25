import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { GeneralServices } from 'services/general.service';

@Component({
  selector: 'app-confirm-with-select',
  templateUrl: './confirm-with-select.component.html',
  styleUrls: ['./confirm-with-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmWithSelectComponent {

  image = '';
  message = '';
  buttonConfirm: string = 'btn_sim';
  buttonCancel: string = 'btn_cancelar';
  resummeCheckbox: string = 'ch_resumoAtendimento';
  checked: boolean = false;
  resumeOn;
  applicationsCriteriaForm: FormGroup;
  lblInput: string;
  applicationsCriteria: any[];
  currentApplicationCriteria: any;

  /**
   * Constructor
   */
  constructor(
    public matDialogRef: MatDialogRef<ConfirmWithSelectComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private translate: TranslateService,
    private _formBuilder: FormBuilder,
    public _generalServices: GeneralServices,
  ) {
    this.resumeOn = this._data.resumeMessage;
    this.message = _data.message;
    if (_data.image) {
      this.image = _data.image;
    }
    this.buttonConfirm = _data.buttonConfirm ? _data.buttonConfirm : this.buttonConfirm;
    this.buttonCancel = _data.buttonCancel ? _data.buttonCancel : this.buttonCancel;

    this.applicationsCriteria = _data.applicationsCriteria;
    this.applicationsCriteriaForm = this.createJustifyForm();
    this.applicationsCriteriaForm.markAllAsTouched();
    this.currentApplicationCriteria = _data.currentApplicationCriteria;

    this.lblInput = _data.lblInput;
  }

  confirm() {
    this.matDialogRef.close(['yes', this.applicationsCriteriaForm?.get('application_criteria').value ? this.applicationsCriteriaForm?.get('application_criteria').value : null]);
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
      application_criteria: new FormControl(this._data.currentApplicationCriteria, Validators.required),
    });
  }
}
