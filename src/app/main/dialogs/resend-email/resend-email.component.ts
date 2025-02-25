import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { OptionsType } from 'app/types/options.type';

@Component({
	selector: 'app-resend-email',
	templateUrl: './resend-email.component.html',
	styleUrls: ['./resend-email.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ResendEmailComponent {

	title: string = 'msg_confirmacao';
	buttonConfirm: string = 'btn_sim';
	buttonCancel: string = 'btn_cancelar';
	dataForm: FormGroup;
	options: OptionsType[];

	/**
	 * Constructor
	 */
	constructor(
		public matDialogRef: MatDialogRef<ResendEmailComponent>,
		@Inject(MAT_DIALOG_DATA) private _data: any,
		private translate: TranslateService,
		private _formBuilder: FormBuilder,

	) {
		if (_data.title) {
			this.title = _data.title;
		}
		if (_data.options) {
			this.options = _data.options;
		}
		this.dataForm = _data.dataForm
		this.buttonConfirm = _data.buttonConfirm ? _data.buttonConfirm : this.buttonConfirm;
		this.buttonCancel = _data.buttonCancel ? _data.buttonCancel : this.buttonCancel;
	}

	confirm() {
		this.matDialogRef.close(['yes']);
	}

	cancel() {
		this.matDialogRef.close(['no']);
	}

}
