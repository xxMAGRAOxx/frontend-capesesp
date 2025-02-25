import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-employee-dialog',
    templateUrl: './employee-dialog.component.html',
    styleUrls: ['./employee-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class EmployeeDialogComponent implements AfterViewInit {

    @ViewChild('badge') badge: ElementRef;

    employee_data: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<MailConfirmDialogComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<EmployeeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any,
        private translate: TranslateService,
    ) {
        this.employee_data = this._data;
    }

    ngAfterViewInit() {
        const win: Window = this.badge.nativeElement.contentWindow;
        const doc: Document = win.document;
        doc.open();
        doc.write(this.employee_data);
        doc.close();
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

    print() {
        this.badge.nativeElement.contentWindow.print();
    }

}
