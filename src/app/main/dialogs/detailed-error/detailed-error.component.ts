import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'detailed-error',
    templateUrl: './detailed-error.component.html',
    styleUrls: ['./detailed-error.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DetailedErrorDialogComponent {

    btn_cancelar = 'btn_cancelar';

    /**
       * Constructor
       *
       * @param {MatDialogRef<DetailedErrorDialogComponent>} matDialogRef
       * @param _data
       */
    constructor(
        public matDialogRef: MatDialogRef<DetailedErrorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any,
        private translate: TranslateService,
    ) {
        if (this._data.lbl_cancelar) {
            this.btn_cancelar = this._data.lbl_cancelar;
        }
    }
    ngOnInit(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    confirm() {
        this.matDialogRef.close(['yes']);
    }
    cancel() {
        this.matDialogRef.close(['no']);
    }

}
