import { AfterViewInit, Component, ElementRef, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'print-preview',
    templateUrl: './print-preview.component.html',
    styleUrls: ['./print-preview.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PrintPreviewDialogComponent implements AfterViewInit {
    @ViewChild('print_preview') print_preview: ElementRef;

    content: string;
    title: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<MailConfirmDialogComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<PrintPreviewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any,
        private translate: TranslateService,
    ) {
        this.content = this._data.report_data;
        this.title = this._data.title ? this._data.title : 'lbl_relatorio'
    }

    ngAfterViewInit() {
        const win: Window = this.print_preview.nativeElement.contentWindow;
        const doc: Document = win.document;
        doc.open();
        doc.write(this.content);
        doc.close();
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

    print() {
        this.print_preview.nativeElement.contentWindow.print();
    }

}
