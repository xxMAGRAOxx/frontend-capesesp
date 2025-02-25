import { Component, ElementRef, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'paycheck',
  templateUrl: './paycheck.component.html',
  styleUrls: ['./paycheck.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class PaycheckDialogSharedComponent {

  @ViewChild('paycheck') paycheck: ElementRef;

  paycheckData: string;
  win: Window
  doc: Document

  titleModal: string = 'lbl_holerite'

  /**
   * Constructor
   *
   * @param {MatDialogRef<MailConfirmDialogComponent>} matDialogRef
   * @param _data
   */
  constructor(
    public matDialogRef: MatDialogRef<PaycheckDialogSharedComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
  ) {
    if (this._data.titleModal) {
      this.titleModal = this._data.titleModal
    }
    this.paycheckData = this._data.paycheckData;
  }


  ngAfterViewInit() {
    const win: Window = this.paycheck.nativeElement.contentWindow;
    const doc: Document = win.document;
    doc.open();
    doc.write(this.paycheckData);
    doc.close();
  }

  cancel() {
    this.matDialogRef.close(['no']);
  }

  print() {
    this.paycheck.nativeElement.contentWindow.print();
  }

}
