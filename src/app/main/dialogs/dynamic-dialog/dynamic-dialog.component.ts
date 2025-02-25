import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDynamicDialog } from 'app/types/dynamicDialog';
import { GeneralServices } from 'services/general.service';
import { MessageActionDialogComponent } from '../message-action-dialog/message-action-dialog.component';

@Component({
  selector: 'dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DynamicDialogComponent {

  data: IDynamicDialog;

  /**
   * Constructor
   */
  constructor(
    public matDialogRef: MatDialogRef<MessageActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: IDynamicDialog,
    public _generalServices: GeneralServices,
  ) {
    this.data = this._data;
  }

  typeOf(value) {
    return typeof value;
  }

  closeModal(data?) {
    this.matDialogRef.close(data);
  }

}
