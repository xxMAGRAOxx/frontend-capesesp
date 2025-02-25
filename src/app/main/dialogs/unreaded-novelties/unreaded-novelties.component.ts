import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'unreaded-novelties',
    templateUrl: './unreaded-novelties.component.html',
    styleUrls: ['./unreaded-novelties.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class UnreadedNoveltiesComponent {

    dataForm: FormGroup;
    noveltyData: any;

    title: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<UnreadedNoveltiesComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<UnreadedNoveltiesComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any,
        private _formBuilder: FormBuilder,

    ) {
        this.dataForm = this.openForm(this._data.form[0]);
        this.title = this.dataForm.get('title').value;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Abre o formulário
     * 
     * @param data Dados a preencher
     * @returns 
     */
    openForm(data): FormGroup {
        var form: any;

        form = this._formBuilder.group({
            id: [data.id],
            title: [data.title,],
            description: [data.description],
            admission_module: [data.admission_module],
            helpdesk_module: [data.helpdesk_module],
            flexible_benefits_module: [data.flexible_benefits_module],
            traditional_benefits_module: [data.traditional_benefits_module],
            start: [data.start],
            active: [data.active],
        });

        form.markAllAsTouched();
        return form;
    }

    close() {
        this.matDialogRef.close(['yes', this.dataForm.get('id').value]);
    }
}