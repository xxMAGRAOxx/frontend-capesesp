import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';
import { CruzzyButtonsModule } from '../../../components/cruzzy-buttons/cruzzy-buttons.module';
import { DatePickerModule } from '../../../components/date-picker/date-picker.module';
import { DayPickerModule } from '../../../components/day-picker/day-picker.module';
import { HtmlEditorModule } from '../../../components/html-editor/html-editor.module';
import { LogsModule } from '../../../components/logs/logs.module';
import { HealthcareCardDataComponent } from './healtcare-card-data.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        FuseSharedModule,
        TranslateModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        MatChipsModule,
        CruzzyButtonsModule,
        HtmlEditorModule,
        MatDialogModule,
        MatTabsModule,
        MatToolbarModule,
        LogsModule,
        DayPickerModule,
        MatDatepickerModule,
        DatePickerModule,
        AgGridModule.withComponents([])
    ],
    declarations: [HealthcareCardDataComponent],
    exports: [
        HealthcareCardDataComponent
    ]
})
export class HealthcareCardDataModule { }

