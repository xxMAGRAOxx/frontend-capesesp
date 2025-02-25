import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'app/model/User';
import { GeneralServices } from 'services/general.service';

@Component({
    selector: 'confirm-data',
    templateUrl: './confirm-data.component.html',
    styleUrls: ['./confirm-data.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ConfirmDataDialogComponent {
    reasons = [];
    processing = false;
    idRequest: number = 0;

    decimalPoint: string = ',';
    thousandsSeparator: string = '.';
    user: User;

    dialogRef: any;
    message: string;
    title: string;

    name: string;
    gender: string;
    vat: string;
    jobTitle: string;
    email: string;
    address: string;
    addressNumber: string;
    addressComplement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
    phone: string;
    mobile: string;
    birthdayDate: any;
    admissionDate: any;
    positionName: string;
    occupationname: string;
    organizational_unit_name: string;
    salary: number;
    salaryRange: string;
    companyImage: string;
    profileDefaultImage: string = '/assets/images/avatars/profile.jpg';

    relatives: any = [];

    hasHelpdesk = false;

    /**
     * Constructor
     */
    constructor(
        public _matDialogRef: MatDialogRef<ConfirmDataDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _generalServices: GeneralServices,
        public _matDialog: MatDialog,
        private _translateServices: TranslateService,

    ) {
        this.name = this._data.user?.name;
        this.gender = this._data.user?.gender;
        this.vat = this._data.user?.vat;
        this.email = this._data.user?.email;
        this.address = this._data.user?.address;
        this.neighborhood = this._data.user?.neighborhood;
        this.city = this._data.user?.city;
        this.state = this._data.user?.state;
        this.zipcode = this._data.user?.zipcode;
        this.phone = this._data.user?.phone;
        this.mobile = this._data.user?.mobile;
        this.birthdayDate = this._data.user?.birthday_date;
        this.admissionDate = this._data.user?.admission_date;
        this.positionName = this._data.user?.position_name;
        this.occupationname = this._data.user?.occupation_name;
        this.organizational_unit_name = this._data.user?.organizational_unit_name;
        this.salary = this._data.user?.salary;
        this.salaryRange = this._data.user?.salary_range_name;
        this.companyImage = this._data.user?.company_image_url;

        this._data.relatives?.forEach(element => {
            this.relatives.push(element);
        });

        this.decimalPoint = this._generalServices.decimalPoint;
        this.thousandsSeparator = this._generalServices.thousandsSeparator;
        this.hasHelpdesk = this._generalServices.user.customer_parameters.helpdesk_module;

        this.message = this._data.message ? this._translateServices.instant(this._data.message) : '';
        this.title = this._data.title ? this._translateServices.instant(this._data.title) : this._translateServices.instant('lbl_seusDados');

    }

    vatFormatter(vat) {
        var i = 0;
        var v = vat.toString();

        let pattern = '##.###.###/####-##';
        if (v.length == 11) {
            pattern = '###.###.###-##';
        }

        return pattern.replace(/#/g, _ => v[i++]);
    }

    zipcodeFormatter(zip) {
        var i = 0;
        var v = zip.toString();

        let pattern = '#####-###';

        return pattern.replace(/#/g, _ => v[i++]);
    }

    /**
     * Confirma os dados apresentados
     */
    confirm() {
        this._matDialogRef.close(['yes']);
    }

    cancel() {
        this._matDialogRef.close(['cancel']);
    }
    requestReview() {
        this._matDialogRef.close(['review']);
    }
}
