import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { GeneralServices } from 'services/general.service';
import { MyCurrency } from 'services/myCurrency.pipes';

@Component({
	selector: 'app-agreement-info',
	templateUrl: './agreement-info.component.html',
	styleUrls: ['./agreement-info.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AgreementInfoComponent {

	locale: string;
	defaultImage: string;

	/**
	 * Constructor
	 */
	constructor(
		public matDialogRef: MatDialogRef<AgreementInfoComponent>,
		@Inject(MAT_DIALOG_DATA) public _data: any,
		private _translateService: TranslateService,
		public _generalServices: GeneralServices,
		private _myCurrency: MyCurrency
	) {
		this.locale = this._generalServices.getLanguage() === 'pt-BR' ?
			'BRL' : this._generalServices.getLanguage() === 'en-US' ? 'USD' : 'EUR';

		this.defaultImage = '/assets/images/avatars/company.jpg';
	}

	confirm() {
		this.matDialogRef.close(['yes']);
	}

	cancel() {
		this.matDialogRef.close(['no']);
	}

	openUrl(url: string): void {
		window.open(url, '_blank');
	}



}
