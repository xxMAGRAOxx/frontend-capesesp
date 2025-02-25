import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-year-reference',
  templateUrl: './confirm-year-reference.component.html',
  styleUrls: ['./confirm-year-reference.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmYearReferenceComponent {

  formGroup: FormGroup;
  minDate: any;

  /**
   * Constructor
   */
  constructor(
    public matDialogRef: MatDialogRef<ConfirmYearReferenceComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private translate: TranslateService,
  ) {
    this.formGroup = _data;
  }

  confirm() {
    this.matDialogRef.close(['yes']);
  }

  cancel() {
    this.matDialogRef.close(['no']);
  }

}
