import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { GeneralServices } from 'services/general.service';

@Component({
    selector: 'file-to-upload',
    templateUrl: './file-to-upload.component.html',
    styleUrls: ['./file-to-upload.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FileToUploadComponent {
    fileToUpload?: File;
    fileToUploadData: FormData;
    fileToUploadForm: FormGroup;
    allowImport: boolean = false;
    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<FileToUploadComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _translateService: TranslateService,
    ) {
        this.fileToUploadData = new FormData();
        this.fileToUploadForm = this.createForm();
    }

    /**
     * Create form
     *
     * @returns {FormGroup}
     */
    createForm(): FormGroup {
        return this._formBuilder.group({
            file: new FormControl(null),
        });
    }

    fileChange(event) {
        if (event.target.files.length) {
            this.fileToUploadData.append('file', event.target.files[0]);
            this.allowImport = true;
        } else {
            this.allowImport = false;
        }
    }

    importFile() {
        this.matDialogRef.close(['import', this.fileToUploadData]);
    }
}
