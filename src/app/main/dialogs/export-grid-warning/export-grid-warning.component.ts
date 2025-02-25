import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'export-grid-warning',
    templateUrl: './export-grid-warning.component.html',
    styleUrls: ['./export-grid-warning.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ExportGridWarningComponent {

    /**
     * Constructor
     *
     * @param {MatDialogRef<ExportGridWarningComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<ExportGridWarningComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    exportMode() {
        this.matDialogRef.close(['yes']);
    }

    close() {
        this.matDialogRef.close(['no']);
    }
}