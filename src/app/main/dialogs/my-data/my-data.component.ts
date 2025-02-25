import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../model/User';
import { GeneralServices } from 'services/general.service';

@Component({
    selector: 'my-data-dialog',
    templateUrl: './my-data.component.html',
    styleUrls: ['./my-data.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class MyDataDialogComponent {
    action: string;
    user: User;
    userType = '';
    userForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<MyDataDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _translateService: TranslateService,
        public _generalServices: GeneralServices,
        private router: Router
    ) {
        this.user = _data.user;
        this.userForm = this.createUserForm();
    }

    /**
     * Create form
     *
     * @returns {FormGroup}
     */
    createUserForm(): FormGroup {

        if (this.user.type == 'administrator') {
            this.userType = 'administrator';

            return this._formBuilder.group({
                name: this.user.name,
                email: this.user.email,
                customer: this.user.customer_name,
                avatar: '',
            });
        }

        if (this.user.type == 'customer') {
            this.userType = 'customer';

            return this._formBuilder.group({
                name: this.user.name,
                email: this.user.email,
                customer: this.user.customer_name,
                avatar: '',
            });
        }

        if (this.user.type == 'employee') {
            this.userType = 'employee';

            return this._formBuilder.group({
                name: this.user.name,
                avatar: '',
                customer: this.user.company_name,
                jobTitle: this.user.position_name,
                unity: this.user.organizational_unit_name,
                email: this.user.email,
                badge: this.user.badge,
                vat: this.user.vat,
                address: 'Rua Marechal Floriano, 175',
                city: 'Curitiba - PR',
                relative_1: '1 - Pedro Augusto Stavistki',
                relative_2: '2 - Eduarda Stavistki',
            });
        }
    }

    myProfile() {
        this.matDialogRef.close();
        this.router.navigate(['employee/views/employee_view']);
    }
}
