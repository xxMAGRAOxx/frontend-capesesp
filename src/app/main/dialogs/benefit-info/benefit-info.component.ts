import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from 'app/main/admin/users/users.service';
import { GeneralServices } from 'services/general.service';
import { MyCurrency } from 'services/myCurrency.pipes';

@Component({
    selector: 'benefit-info-dialog',
    templateUrl: './benefit-info.component.html',
    styleUrls: ['./benefit-info.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class BenefitInfoDialogComponent {
    action: string;
    userForm: FormGroup;
    dialogTitle: string;
    benefit_name: string;
    detailUrl: string;
    customer: string;
    category_name: string;
    description: string;
    contribuity: string;
    price: number;
    termValue: number;
    definedPointrange: number;
    detail_url: string;
    logoUrl: string[];
    notes: string[];
    benefit_supplier: string;
    locale: string;
    defaultImage: string;
    allow_surplus_points: boolean;
    company_fixed_contribution_value: number;
    company_contribution_percentual: string;
    finalPriceDeduction: number;
    onlyView: boolean;
    healthcareAgeGroups: any[];
    options: any[];

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<BenefitInfoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any,
        private _formBuilder: FormBuilder,
        private _translateService: TranslateService,
        private _usersService: UsersService,
        public _generalServices: GeneralServices,
        private _myCurrency: MyCurrency
    ) {
        this.userForm = this.benefitForm();
        this.benefit_name = _data.benefit_name;
        this.detailUrl = _data.detail_url;
        this.logoUrl = _data.logos;
        this.benefit_supplier = this._data.benefit_supplier;
        this.customer = this._data.customer;
        this.category_name = this._data.category_name;
        this.description = _data.notes?.lenght > 0 ? _data.notes[0]?.text : '';
        this.contribuity = this._data.contribuity;
        this.price = this._data.price;
        this.termValue = this._data.termValue;
        this.definedPointrange = this._data.definedPointrange;
        this.detail_url = this._data.detail_url;
        this.allow_surplus_points = this._data.allow_surplus_points;
        this.onlyView = this._data.onlyView ? this._data.onlyView : false
        this.locale = this._generalServices.getLanguage() === 'pt-BR' ?
            'BRL' : this._generalServices.getLanguage() === 'en-US' ? 'USD' : 'EUR';
        if (_data.healthcare_age_groups) {
            this.healthcareAgeGroups = _data.healthcare_age_groups
        }

        if (_data.entries && _data.entries.healthcare_age_groups) {
            this.healthcareAgeGroups = _data.entries.healthcare_age_groups
        }
        if (_data.options) {
            this.options = _data.options;
        }

        this.defaultImage = '/assets/images/avatars/company.jpg';

        if (this._data.company_contribution_percentual == '0.00' && this._data.company_fixed_contribution_value > 0) {
            let tempPrice = this._data.price - this._data.company_fixed_contribution_value;
            this.finalPriceDeduction = tempPrice > 0 ? tempPrice : 0;
        }
    }

    /**
     * Create form
     *
     * @returns {FormGroup}
     */
    benefitForm(): FormGroup {

        return this._formBuilder.group({
            benefit_supplier: this._data.benefit_supplier,
            logos: this._data.logos,
            customer: this._data.customer,
            category_name: this._data.category_name,
            description: this._data && this._data.notes?.lenght > 0 ? this._data.notes[0]?.text : '',
            contribuity: this._data.contribuity,
            price: this._data.price,
            termValue: this._data.termValue,
            definedPointrange: this._data.definedPointrange,
            detail_url: this._data.detail_url,
            allow_surplus_points: this._data.allow_surplus_points,
        });


    }

    confirm() {
        this.matDialogRef.close(['yes']);
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

    openUrl(url: string): void {
        window.open(url, '_blank');
    }

    getPoints(): string {
        if (this._data.min_points == this._data.max_points) {
            if (this._generalServices.user.benefits_modality === 'T') {
                if (this._data.price === 0) {
                    return this._myCurrency.transform(this._data.max_points);
                }
                else {
                    return this._myCurrency.transform(this._data.price);
                }
            }
            return this._data.max_points;
        }
        if (this._data.liquid_points) {
            if (this._data.full_points > 0 && (this._data.full_points >= this._data.min_points)) {
                return this._data.full_points;
            }
            else {
                return this._data.used_points;
            }
        }
        else {
            if (this._generalServices.user.benefits_modality === 'T') {
                return this._myCurrency.transform(this._data.min_points) + ' a ' + this._myCurrency.transform(this._data.max_points);
            }
            else {
                return this._data.min_points + ' a ' + this._data.max_points;
            }
        }
    }

    getLabel(): string {
        if (this._generalServices.user.benefits_modality !== 'T') {
            return 'lbl_pontos';
        }
        return '';
    }
}
