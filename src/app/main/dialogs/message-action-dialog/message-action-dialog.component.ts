import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GeneralServices } from 'services/general.service';
import { TreeViewUtils } from 'utils/treeviewutils';

@Component({
  selector: 'message-action-dialog',
  templateUrl: './message-action-dialog.component.html',
  styleUrls: ['./message-action-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageActionDialogComponent {


  data: any;

  /**
   * Constructor
   */
  constructor(
    public matDialogRef: MatDialogRef<MessageActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _treeViewUtils: TreeViewUtils,
    public _generalServices: GeneralServices,
  ) {
    this.data = this._data;
  }

  /**
   * Guarda os itens selecionados na Tree
   * 
   * @param values 
   */
  onSelectedChange(values): void {
    this.data.dataForm.get('companies').setValue(values);
  }

  closeModal(data: any) {
    this.matDialogRef.close(data);
  }


}
