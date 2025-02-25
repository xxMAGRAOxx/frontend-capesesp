import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'radio-choice',
  templateUrl: './radio-choice.component.html',
  styleUrls: ['./radio-choice.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RadioChoiceComponent {

  dataForm: FormGroup;
  title: string;

  /**
   * Constructor
   */
  constructor(
    public matDialogRef: MatDialogRef<RadioChoiceComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
  ) {
    this.title = this._data.title;
    this.dataForm = this.openForm();
  }



  /**
   * Create form
   *
   * @returns {FormGroup}
   */
  openForm(): FormGroup {
    return this._formBuilder.group({
      type: new FormControl('U', Validators.required),
    });
  }

  confirm() {
    this.matDialogRef.close(['yes', this.dataForm.controls.type.value]);
  }

}
