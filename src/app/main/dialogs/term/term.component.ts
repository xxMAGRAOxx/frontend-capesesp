import { AfterViewInit, Component, ElementRef, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'term',
    templateUrl: './term.component.html',
    styleUrls: ['./term.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TermDialogSharedComponent implements AfterViewInit {

    @ViewChild('term') term: ElementRef;
    @ViewChild('termEleicao') termEleicao: ElementRef;

    term_content: string;
    termContentEnrollView: string;
    win: Window
    doc: Document

    winEleicao: Window
    docEnrollView: Document

    tabIndex: number
    sinlgeView: boolean

    titleModal: string = 'lbl_documento'

    /**
     * Constructor
     *
     * @param {MatDialogRef<MailConfirmDialogComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<TermDialogSharedComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any,
        private translate: TranslateService,
    ) {
        if (this._data.titleModal) {
            this.titleModal = this._data.titleModal
        }
        this.term_content = this._data.termsData.term_data;
        this.termContentEnrollView = this._data.termsDataEnrollView?.term_data;
        this.sinlgeView = this._data.singleView;
    }


    ngAfterViewInit() {
        // Termo de adesão
        const win: Window = this.term.nativeElement.contentWindow;
        const doc: Document = win.document;

        doc.open();
        doc.write(this.term_content);
        doc.close();
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

    print() {
        if (this.tabIndex == 1) {
            this.termEleicao.nativeElement.contentWindow.print();
        } else {
            this.term.nativeElement.contentWindow.print();
        }

    }

    onTabChanged($event: any) {
        this.tabIndex = $event.index;

        if ($event.index == 0) {
            const win: Window = this.term.nativeElement.contentWindow;
            const doc: Document = win.document;

            doc.open();
            doc.write(this.term_content);
            doc.close();
        } else {
            this.winEleicao = this.termEleicao.nativeElement.contentWindow;
            this.docEnrollView = this.winEleicao.document;

            this.docEnrollView.open();
            this.docEnrollView.write(this.termContentEnrollView);
            this.docEnrollView.close();
        }
    }

}
