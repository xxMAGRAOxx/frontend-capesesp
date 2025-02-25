import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
    selector: 'app-temporary-access',
    templateUrl: './temporary-access.component.html',
    styleUrls: ['./temporary-access.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TemporaryAccessDialogComponent {

    dataForm: FormGroup;
    minDate = moment().add(0, 'days');

    /**
       * Constructor
       */
    constructor(
        public matDialogRef: MatDialogRef<TemporaryAccessDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _translateService: TranslateService,
    ) {
        this.dataForm = _data.dataForm;
        this.dataForm.markAllAsTouched();
    }

    confirm() {
        this.matDialogRef.close(['yes']);
    }
    cancel() {
        this.matDialogRef.close(['no']);
    }

}
