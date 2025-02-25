import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MessageDialogComponent {
    message = '';
    label = 'btn_ok';
    title: string;

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<MessageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _translateServices: TranslateService,
    ) {
        this.message = _data.message;
        this.title = this._data.title ? this._translateServices.instant(this._data.title) : this._translateServices.instant('lbl_aviso');

        if (_data.label) {
            this.label = _data.label
        }

    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

}
