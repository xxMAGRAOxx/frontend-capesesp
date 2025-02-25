import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GeneralServices } from 'services/general.service';

@Component({
  selector: 'app-benefits-to-export',
  templateUrl: './benefits-to-export.component.html',
  styleUrls: ['./benefits-to-export.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BenefitsToExportDialogComponent implements OnInit {

  dataForm: FormGroup;
  benefits: any;

  /**
   * Constructor
   */
  constructor(
    public matDialogRef: MatDialogRef<BenefitsToExportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    public _generalServices: GeneralServices,
  ) {
    this.dataForm = _data.formGroup;
    this.benefits = _data.benefitsTopups
  }

  ngOnInit(): void {
  }

  confirm() {
    this.matDialogRef.close(['yes']);
  }

  cancel() {
    this.matDialogRef.close(['no']);
  }

}
