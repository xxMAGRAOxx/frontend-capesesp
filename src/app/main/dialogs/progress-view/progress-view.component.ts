import { AfterViewInit, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { round } from 'lodash';
import { ProcessesServices } from 'services/admin/processes.services';
import { GeneralServices } from 'services/general.service';

@Component({
    selector: 'progress-view',
    templateUrl: './progress-view.component.html',
    styleUrls: ['./progress-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProgressViewDialogComponent implements OnInit, AfterViewInit {
    message = '';
    process_id = '';
    translate: boolean;

    interval: any;

    record_id = 0;
    total_records = 0;
    actual_record = 0;
    progress = '';
    percentual = 0;
    end = false;
    attempts = 0;
    max_attempts: number = 30;
    allowBackgroundProcess = false;
    tempBlocked = true;

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<ProgressViewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _translate: TranslateService,
        private _processesServices: ProcessesServices,
        private _generalServices: GeneralServices,
        private _snackBar: MatSnackBar,

    ) {
        this.message = _data.message;
        this.process_id = _data.process_id;
        this.translate = _data.translate;
        if (_data.allowBackgroundProcess) {
            this.allowBackgroundProcess = _data.allowBackgroundProcess
        }
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.tempBlocked = false;
        }, 5000);
    }

    ngOnInit(): void {
        this.interval = setInterval(() => {
            this.trackProgress()
        }, 1200);
    }

    setBackgroundProcess() {
        this._generalServices.addGlobalProcessing(this.process_id);
        this._generalServices.updateLocalStorageProcess();
        clearInterval(this.interval);
        this.matDialogRef.close(['no']);
    }

    trackProgress() {
        if (this.end) {
            clearInterval(this.interval);
            this.matDialogRef.close(['yes', this.record_id]);
        } else
            this._processesServices.getDetail(this.process_id).subscribe((data) => {
                this.record_id = data.process.record_id;
                this.total_records = data.process.total_records;
                this.actual_record = data.process.actual_record;
                if (data.process.progress !== null) {
                    this.progress = this.translate ? this._translate.instant(data.process.progress !== "" ? data.process.progress : " ") : data.process.progress;
                }
                this.percentual = data.process.total_records != 0 ? (
                    round(data.process.actual_record / data.process.total_records * 100)
                ) : 100;
                this.end = (data.process.end == null ? false : true);
            }, (error: any) => {

                if (this.attempts >= this.max_attempts) {
                    clearInterval(this.interval);
                    this.matDialogRef.close(['yes', this.record_id]);
                    return;
                }
                if (error.status == 401) {
                    sessionStorage.setItem('cruzzyapp_auth-token', '');
                    window.location.href = '/auth/login';
                } else {
                    if (error.status == 404) {
                        this.attempts++;
                    } else {
                        clearInterval(this.interval);
                        this.matDialogRef.close(['yes', this.record_id]);
                        return;
                    }
                }
            });
    }


}
