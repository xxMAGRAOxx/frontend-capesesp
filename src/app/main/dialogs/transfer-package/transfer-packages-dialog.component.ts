import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TransferPackageService } from 'app/main/admin/transfer-packages/transfer-packages.service';
import { Subject } from 'rxjs';
import { GeneralServices } from 'services/general.service';

@Component({
    selector: 'app-transfer-packages-dialog',
    templateUrl: './transfer-packages-dialog.component.html',
    styleUrls: ['./transfer-packages-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TransferPackagesDialogComponent implements OnInit {
    dataForm: FormGroup;
    newEmployees: any[] = [];
    oldEmployees: any[] = [];
    oldCompanies: any[] = [];
    newCompanies: any[] = [];

    companies: any[] = [];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<TransferPackagesDialogComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<TransferPackagesDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _translateService: TranslateService,
        public _generalServices: GeneralServices,
        private _transferPackagesService: TransferPackageService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.companies = _data[0].companies;
        this.oldCompanies = this.companies;
        this.newCompanies = this.companies;
    }

    ngOnInit(): void {
        this.dataForm = this.openForm();
        if (this._data[0].dataForm) {
            this.dataForm.patchValue(this._data[0].dataForm.value)
        }
        this.dataForm.get('old_employee_id').valueChanges.subscribe(val => {
            if (val) {
                let oldEmployee = this.oldEmployees.filter(emp => emp.id == this.dataForm.get('old_employee_id').value)[0]
                this.dataForm.get('old_employee_name').setValue(oldEmployee.name)
                this.dataForm.get('old_employee_code').setValue(oldEmployee.badge)
                this.dataForm.get('new_employee_id').setValue(null)
                this.dataForm.get('new_company_id').setValue(null)
            } else {
                this.dataForm.get('new_employee_id').setValue(null)
                this.dataForm.get('new_company_id').setValue(null)
                this.dataForm.get('old_employee_name').setValue(null)
                this.dataForm.get('old_employee_code').setValue(null)
            }
        })
        this.dataForm.get('new_employee_id').valueChanges.subscribe(val => {
            if (val) {
                let newEmployee = this.newEmployees.filter(emp => emp.id == this.dataForm.get('new_employee_id').value)[0]
                this.dataForm.get('new_employee_name').setValue(newEmployee.name)
                this.dataForm.get('new_employee_code').setValue(newEmployee.badge)
            } else {
                this.dataForm.get('new_employee_name').setValue(null)
                this.dataForm.get('new_employee_code').setValue(null)
            }
        })
        this.dataForm.get('new_company_id').valueChanges.subscribe(val => {
            if (val) {
                this.dataForm.get('new_company_name').setValue(this.newCompanies.filter(emp => emp.id == this.dataForm.get('new_company_id').value)[0].name)
                this.dataForm.get('new_employee_id').setValue(null)
            } else {
                this.dataForm.get('new_company_name').setValue(null)
            }
        })
        this.dataForm.get('old_company_id').valueChanges.subscribe(val => {
            if (val) {
                this.dataForm.get('old_company_name').setValue(this.oldCompanies.filter(emp => emp.id == this.dataForm.get('old_company_id').value)[0].name)
                this.dataForm.get('old_employee_id').setValue(null)
                this.dataForm.get('new_employee_id').setValue(null)
                this.dataForm.get('new_company_id').setValue(null)
            } else {
                this.dataForm.get('old_company_name').setValue(null)
                this.dataForm.get('old_employee_id').setValue(null)
            }
        })
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * cria o form
     */
    openForm(): FormGroup {
        return this._formBuilder.group({
            created: new FormControl(),
            error_message: new FormControl(),
            new_company_code: new FormControl(),
            new_company_id: new FormControl(null, [Validators.required]),
            new_company_name: new FormControl(),
            new_employee_code: new FormControl(),
            new_employee_id: new FormControl(null, [Validators.required]),
            new_employee_name: new FormControl(),
            old_company_code: new FormControl(),
            old_company_id: new FormControl(null, [Validators.required]),
            old_company_name: new FormControl(),
            old_employee_code: new FormControl(),
            old_employee_id: new FormControl(null, [Validators.required]),
            old_employee_name: new FormControl(),
            vat: new FormControl()
        });
    }

    changeCompanies(companie: string) {
        companie == "new_company_id"
            ? (
                this.oldCompanies = this.companies.filter((com) => com.id !== this.dataForm.get(companie).value),
                this._transferPackagesService.getEmployeeByCompanie(this.dataForm.get(companie).value).then((result) => {
                    this.newEmployees = result.filter((emp) => emp.vat == this.oldEmployees.filter((val) => val.id == this.dataForm.get('old_employee_id').value)[0].vat)
                })
            )
            : (
                this.newCompanies = this.companies.filter((com) => com.id !== this.dataForm.get(companie).value),
                this._transferPackagesService.getEmployeeByCompanie(this.dataForm.get(companie).value).then((result) => {
                    this.oldEmployees = result
                })
            )
    }

    /**
     * retorna a confirmacao da transferencia passando o employee_id
     */
    transferTicket(): void {
        this.matDialogRef.close(['yes', this.dataForm]);
    }

    cancel() {
        this.oldCompanies = [];
        this.newCompanies = [];

        this.dataForm.reset();
        this.matDialogRef.close(['no']);
    }
}
