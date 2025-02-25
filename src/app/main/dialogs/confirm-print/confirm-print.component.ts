import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { EnrollmentService } from '../../enrollment.service';

@Component({
    selector: 'confirm-print',
    templateUrl: './confirm-print.component.html',
    styleUrls: ['./confirm-print.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ConfirmPrintDialogComponent {
    printAllowed = true;
    /**
     * Constructor
     *
     * @param {MatDialogRef<MailConfirmDialogComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<ConfirmPrintDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any,
        //private enrollmentService: EnrollmentService,
    ) {
        //Antigo - estava validando o ID do conjunto de beneficios atuais
        //this.printAllowed =this.enrollmentService.mainData.enrollment_period.allow_enrollment_form_print && !(this.enrollmentService.mainData.enrollment_period.actual_benefits_package_id == null);
        //this.printAllowed = this.enrollmentService.mainData.enrollment_period.allow_enrollment_form_print;
    }

    print() {
        this.matDialogRef.close(['print']);
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

}
