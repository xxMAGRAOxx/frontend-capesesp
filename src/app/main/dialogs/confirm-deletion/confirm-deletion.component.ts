import { Component, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'confirm-deletion',
    templateUrl: './confirm-deletion.component.html',
    styleUrls: ['./confirm-deletion.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ConfirmDeletionDialogComponent {
    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<ConfirmDeletionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private translate: TranslateService,
    ) {
    }

    confirm() {
        this.matDialogRef.close(['yes']);
    }
    cancel() {
        this.matDialogRef.close(['no']);
    }

}
