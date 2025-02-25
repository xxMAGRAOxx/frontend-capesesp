import { CommonModule } from '@angular/common';
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
import { CruzzySelectModule } from 'app/components/cruzzy-select/ng-select/lib/ng-select.module';
import { TreeviewModule } from 'app/components/treeview/treeview.module';
import { PipeSharedModule } from 'app/pipe-shared.module';
import { SharedModule } from 'app/shared.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { CruzzyAccordionComponent } from './cruzzy-accordion/cruzzy-accordion.component';
import { CruzzyCheckboxComponent } from './cruzzy-checkbox/cruzzy-checkbox.component';
import { CruzzyFileComponent } from './cruzzy-file/cruzzy-file.component';
import { CruzzyFormComponent } from './cruzzy-form/cruzzy-form.component';
import { CruzzyHtmlEditorComponent } from './cruzzy-html-editor/cruzzy-html-editor.component';
import { CruzzyInputComponent } from './cruzzy-input/cruzzy-input.component';
import { CruzzyListComponent } from './cruzzy-list/cruzzy-list.component';
import { CruzzySelectionComponent } from './cruzzy-selection/cruzzy-selection.component';
import { CruzzyTextAreaComponent } from './cruzzy-text-area/cruzzy-text-area.component';
import { CruzzyTreeViewComponent } from './cruzzy-tree-view/cruzzy-tree-view.component';
import { CruzzyMessageBoxComponent } from './dialog-cruzzy-message-box/dialog-cruzzy-message-box.component';
import { DynamicDialogComponent } from './dynamic-dialog.component';
import { CruzzyMonetizationComponent } from './cruzzy-monetization/cruzzy-monetization.component';
import { CruzzySlideToggleComponent } from './cruzzy-slide-toggle/cruzzy-slide-toggle.component';
import { CruzzyDynamicDatePickerComponent } from './cruzzy-dynamic-date-picker/cruzzy-dynamic-date-picker.component';



@NgModule({
  declarations: [
    DynamicDialogComponent,
    CruzzyAccordionComponent,
    CruzzyTreeViewComponent,
    CruzzySelectionComponent,
    CruzzyInputComponent,
    CruzzyHtmlEditorComponent,
    CruzzyCheckboxComponent,
    CruzzyListComponent,
    CruzzyFileComponent,
    CruzzyTextAreaComponent,
    CruzzyFormComponent,
    CruzzyMessageBoxComponent,
    CruzzyMonetizationComponent,
    CruzzySlideToggleComponent,
    CruzzyDynamicDatePickerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatStepperModule,
    MatCheckboxModule,
    MatDatepickerModule,
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
  ]
})
export class DynamicDialogModule { }
