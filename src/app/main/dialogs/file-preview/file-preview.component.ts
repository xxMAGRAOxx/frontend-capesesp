import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'environments/environment';
import * as FileSaver from 'file-saver';
import { FilePreviewService } from './file-preview.service';
import { ServiceTicketsAdminService } from 'app/main/admin/service-tickets-admin/service-tickets-admin.service';

@Component({
    selector: 'file-preview',
    templateUrl: './file-preview.component.html',
    styleUrls: ['./file-preview.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FilePreviewComponent implements OnInit {

    @ViewChild('file_preview') file_preview: ElementRef;

    content: any;
    file: string;
    accountName = environment.file_accout
    containerName = environment.file_container;
    sas = environment.file_sas;
    url: SafeResourceUrl;
    src: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<MailConfirmDialogComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<FilePreviewComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any,
        public sanitizer: DomSanitizer,
        private _filePreviewService: FilePreviewService,
        private _translateService: TranslateService,
        private _snackBar: MatSnackBar,
        private _serviceTicketService: ServiceTicketsAdminService,

    ) {
        this.content = this._data
    }

    ngOnInit(): void {
        this.src = this.content.file_url
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.src)
        this._filePreviewService.fetchImage(this.src).subscribe(() => {
        }, (err: any) => {
            if (err.status != 200) {
                this._snackBar.open(this._translateService.instant('lbl_imagemNaoExiste'), 'X', { duration: 60000, panelClass: 'error-snackbar' });
                this.matDialogRef.close(['no']);
            }
        });
    }

    async download() {
        if (this.content.service_ticket_id){
            this._serviceTicketService.saveFileLog(this.content.service_ticket_id, this.content.id, 'DOWNLOAD');
        }
        let blob = await fetch(this.src).then(r => r.blob());

        let filename = this.content.downloadable_file_name;

        FileSaver.saveAs(blob, filename);
    }

    ngAfterViewInit() {
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

}
