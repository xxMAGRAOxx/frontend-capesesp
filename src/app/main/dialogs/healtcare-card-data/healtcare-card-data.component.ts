import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HealthcareCardDataService } from './healtcare-card-data.service';

@Component({
    selector: 'healtcare-card-data',
    templateUrl: './healtcare-card-data.component.html',
    styleUrls: ['./healtcare-card-data.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HealthcareCardDataComponent {

    // Formulário e campos de dados
    editForm: FormGroup;
    dataForm: FormGroup;
    isDinamicallyFields: boolean = false;
    type: string = '';

    title: string = 'Editar dados';

    columns: any[] = [];

    constructor(
        public matDialogRef: MatDialogRef<HealthcareCardDataComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _HealthcareCardDataService: HealthcareCardDataService,
    ) {
        this.columns = this._data.columns;
        this.isDinamicallyFields = this._data.isDinamicallyFields;
        this.dataForm = this._data.dataForm;
        this.title = this._data.title;

        if (this.isDinamicallyFields) {
            this.editForm = this.openDinamicallyForm();
        } else {
            this.editForm = this.openForm(this._data.columns);
        }

        this.type = this._data.type;
    }

    /**
     * Create  form dinamically
     * @returns {FormGroup}
     */
    openDinamicallyForm(): FormGroup {
        let form = new FormGroup({});
        this.columns.forEach((column: any) => {
            form.addControl(column.field, new FormControl(''));
        });

        return form;
    }

    /**
     * Create  form
     * @returns {FormGroup}
     */
    openForm(data?): FormGroup {

        return new FormGroup({
            benefit_card_number: new FormControl(data[0]),
            benefit_certified_number: new FormControl(data[1]),
            beneficiary_code: new FormControl(data[2]),
            titular_code: new FormControl(data[3]),
            benefit_effective_date: new FormControl(data[4] ? new Date(data[4]) : null),
            cd_codigo_maisvt: new FormControl(this._data.row.data?.maisvt?.codigo),
            sg_estado_maisvt: new FormControl(this._data.row.data?.maisvt?.estado),
        });
    }

    save() {
        // update data
        if (this._data.type == 'E') {
            this._data.dataForm.value.employee_entries[0].benefit_card_number = this.editForm.value.benefit_card_number;
            this._data.dataForm.value.employee_entries[0].benefit_certified_number = this.editForm.value.benefit_certified_number;
            this._data.dataForm.value.employee_entries[0].beneficiary_code = this.editForm.value.beneficiary_code;
            this._data.dataForm.value.employee_entries[0].titular_code = this.editForm.value.titular_code;
            this._data.dataForm.value.employee_entries[0].benefit_effective_date = this.editForm.value.benefit_effective_date;
        } else {
            this._data.dataForm.value.relative_entries[0].benefit_card_number = this.editForm.value.benefit_card_number;
            this._data.dataForm.value.relative_entries[0].benefit_certified_number = this.editForm.value.benefit_certified_number;
            this._data.dataForm.value.relative_entries[0].beneficiary_code = this.editForm.value.beneficiary_code;
            this._data.dataForm.value.relative_entries[0].titular_code = this.editForm.value.titular_code;
            this._data.dataForm.value.relative_entries[0].benefit_effective_date = this.editForm.value.benefit_effective_date;
        }

        this._HealthcareCardDataService.save(this._data.editCellsID, this.editForm.value, this.type).then((result: any) => {
            this.matDialogRef.close(['yes', this.dataForm]);
        });
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

}
