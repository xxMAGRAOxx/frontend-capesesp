import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { AgGridModule } from 'ag-grid-angular';
import { CruzzySelectModule } from 'app/components/cruzzy-select/ng-select/lib/ng-select.module';
import { TreeviewModule } from 'app/components/treeview/treeview.module';
import { ChangePasswordDialogComponent } from 'app/main/dialogs/change-password/change-password.component';
import { MyDataDialogComponent } from 'app/main/dialogs/my-data/my-data.component';
import { PipeSharedModule } from 'app/pipe-shared.module';
import { SharedModule } from 'app/shared.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { AgreementInfoComponent } from './agreement-info/agreement-info.component';
import { ApplyBasicRegistersComponent } from './apply-basic-registers/apply-basic-registers.component';
import { BenefitDocumentViewComponent } from './benefit-document-view/benefit-document-view.component';
import { BenefitInfoDialogComponent } from './benefit-info/benefit-info.component';
import { BenefitsToExportDialogComponent } from './benefits-to-export/benefits-to-export.component';
import { ConfirmDataDialogComponent } from './confirm-data/confirm-data.component';
import { ConfirmDeletionDialogComponent } from './confirm-deletion/confirm-deletion.component';
import { ConfirmPrintDialogComponent } from './confirm-print/confirm-print.component';
import { ConfirmReferenceDateComponent } from './confirm-reference-date/confirm-reference-date.component';
import { ConfirmRefundDialogComponent } from './confirm-refund/confirm-refund.component';
import { ConfirmWithSelectComponent } from './confirm-with-select/confirm-with-select.component';
import { ConfirmYearReferenceComponent } from './confirm-year-reference/confirm-year-reference.component';
import { ConfirmDialogComponent } from './confirm/confirm.component';
import { CustomEmailComponent } from './custom-email/custom-email.component';
import { DetailedErrorDialogComponent } from './detailed-error/detailed-error.component';
import { DocumentViewComponent } from './document-view/document-view.component';
import { DynamicDialogModule } from './dynamic-dialog/dynamic-dialog.module';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { ViewErrorDialogComponent } from './error/error.component';
import { ExportGridWarningComponent } from './export-grid-warning/export-grid-warning.component';
import { FilePreviewComponent } from './file-preview/file-preview.component';
import { GenerateTermBenefitsComponent } from './generate-term-benefits/generate-term-benefits.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { JustifyDialogComponent } from './justify/justify.component';
import { MessageActionDialogComponent } from './message-action-dialog/message-action-dialog.component';
import { MessageDialogComponent } from './message/message.component';
import { PaycheckDialogSharedComponent } from './paycheck/paycheck.component';
import { PayrollDeductionExportDialogComponent } from './payroll-deduction-export/payroll-deduction-export';
import { EnrollmentPeriodReopenEmailDialogComponent } from './enrollment-period-reopen-email/enrollment-period-reopen-email.component';
import { PlatformUseTermComponent } from './platform-use-term/platform-use-term.component';
import { PrintPreviewDialogComponent } from './print-preview/print-preview.component';
import { ProgressViewDialogComponent } from './progress-view/progress-view.component';
import { RadioChoiceComponent } from './radio-choice/radio-choice.component';
import { RatingComponent } from './rating/rating.component';
import { RefuseJobOfferDialogComponent } from './refuse-job-offer/refuse-job-offer.component';
import { RegisterRequestDialogComponent } from './registration-request/registration-request.component';
import { ResendEmailComponent } from './resend-email/resend-email.component';
import { ServiceTicketDialogComponent } from './service-ticket-dialog/service-ticket-dialog.component';
import { TemporaryAccessDialogComponent } from './temporary-access/temporary-access.component';
import { TermDialogSharedComponent } from './term/term.component';
import { TransferPackagesDialogComponent } from './transfer-package/transfer-packages-dialog.component';
import { TransferTicketDialogComponent } from './transfer-ticket-dialog/transfer-ticket-dialog.component';
import { UnreadedNoveltiesComponent } from './unreaded-novelties/unreaded-novelties.component';
import { FileToUploadComponent } from './file-to-upload/file-to-upload.component';

@NgModule({
    declarations: [
        MyDataDialogComponent,
        ChangePasswordDialogComponent,
        ConfirmDeletionDialogComponent,
        ConfirmDialogComponent,
        ViewErrorDialogComponent,
        ImageUploadComponent,
        ProgressViewDialogComponent,
        PrintPreviewDialogComponent,
        RegisterRequestDialogComponent,
        DetailedErrorDialogComponent,
        MessageDialogComponent,
        FilePreviewComponent,
        ConfirmReferenceDateComponent,
        ConfirmPrintDialogComponent,
        TermDialogSharedComponent,
        ServiceTicketDialogComponent,
        TransferTicketDialogComponent,
        RefuseJobOfferDialogComponent,
        EmployeeDialogComponent,
        TermDialogSharedComponent,
        BenefitInfoDialogComponent,
        ConfirmDataDialogComponent,
        JustifyDialogComponent,
        ConfirmRefundDialogComponent,
        BenefitsToExportDialogComponent,
        RatingComponent,
        TransferPackagesDialogComponent,
        DocumentViewComponent,
        PlatformUseTermComponent,
        ConfirmYearReferenceComponent,
        UnreadedNoveltiesComponent,
        PayrollDeductionExportDialogComponent,
        EnrollmentPeriodReopenEmailDialogComponent,
        ExportGridWarningComponent,
        TemporaryAccessDialogComponent,
        ApplyBasicRegistersComponent,
        BenefitDocumentViewComponent,
        ConfirmWithSelectComponent,
        PaycheckDialogSharedComponent,
        CustomEmailComponent,
        GenerateTermBenefitsComponent,
        ResendEmailComponent,
        RadioChoiceComponent,
        MessageActionDialogComponent,
        AgreementInfoComponent,
        FileToUploadComponent
    ],
    imports: [
        MatButtonModule,
        MatStepperModule,
        MatCheckboxModule,
        MatDatepickerModule,
        AgGridModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        NgxDnDModule,
        CruzzySelectModule,
        FuseSharedModule,
        FuseSidebarModule,
        TranslateModule,
        SharedModule,
        DropzoneModule,
        MatProgressBarModule,
        MatDialogModule,
        MatListModule,
        PipeSharedModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatExpansionModule,
        MatRadioModule,
        MatTabsModule,
        MatTreeModule,
        TreeviewModule,
        DynamicDialogModule,
    ],
    providers: [

    ]
})
export class DialogsModule {
}
