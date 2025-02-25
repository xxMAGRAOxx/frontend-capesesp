import {Component, Inject, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'view-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ViewErrorDialogComponent {
    /**
     * Constructor
     *
     * @param {MatDialogRef<ViewErrorDialogComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<ViewErrorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any,
        private translate: TranslateService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    close() {
        this.matDialogRef.close(['ok']);
    }

}
