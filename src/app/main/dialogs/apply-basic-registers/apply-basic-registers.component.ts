import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { GeneralServices } from 'services/general.service';

@Component({
  selector: 'app-apply-basic-registers',
  templateUrl: './apply-basic-registers.component.html',
  styleUrls: ['./apply-basic-registers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApplyBasicRegistersComponent implements OnInit {

  dataForm: FormGroup

  constructor(
    public matDialogRef: MatDialogRef<ApplyBasicRegistersComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _translateService: TranslateService,
    public _generalServices: GeneralServices
  ) {
    this.dataForm = _data.form
  }

  ngOnInit() {
  }

  confirm() {
    this.matDialogRef.close(['yes']);
  }
  cancel() {
    this.matDialogRef.close(['no']);
  }

}
