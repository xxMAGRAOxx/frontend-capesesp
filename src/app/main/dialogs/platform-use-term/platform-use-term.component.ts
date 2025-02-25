import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'platform-use-term',
    templateUrl: './platform-use-term.component.html',
    styleUrls: ['./platform-use-term.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PlatformUseTermComponent {

    message = '';
    buttonConfirm: string = 'btn_confirmar_termos';
    buttonCancel: string = 'btn_cancelar';
    resummeCheckbox: string = 'ch_aceiteTermoDeUso';
    checked: boolean = false;
    resumeOn;
    endPage: boolean;

    dataHtml: any;

    currentPosition = window.pageYOffset;

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<PlatformUseTermComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private translate: TranslateService,

    ) {

        this.message = _data.message;
        this.buttonConfirm = _data.buttonConfirm ? _data.buttonConfirm : this.buttonConfirm;
        this.buttonCancel = _data.buttonCancel ? _data.buttonCancel : this.buttonCancel;
        this.resummeCheckbox = _data.resumeMessage ? _data.resumeMessage : this.resummeCheckbox;

        this.dataHtml = _data.dataForm.ds_termo_uso_plataforma;

        // if (_data.dataForm.ds_termo_uso_plataforma.length < 2000) {
        //     this.endPage = true;
        //     this.resumeOn = true;
        // }
        this.endPage = true;
        this.resumeOn = true;
    }

    confirm() {
        this.matDialogRef.close(this._data.resumeMessage ? ['yes', this.checked == true ? true : null] : ['yes']);
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

    onScroll(event: any) {
        // if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 1) {
        //     this.endPage = true;
        //     this.resumeOn = true;
        // }
    }

    onClickChecked(event) {
        this.endPage ? this.checked = !this.checked : null;
    }
}
