import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { BenefitCategoriesService } from 'app/main/admin/benefit-categories/benefit-categories.service';
import { BenefitsDocumentsServices } from 'app/main/admin/benefits-documents/benefits-documents.service';
import { BenefitsService } from 'app/main/admin/benefits/benefits.service';
import { ProcessBenefitChangesService } from 'app/main/admin/process-benefit-changes/process-benefit-changes.service';
import { ProvidersServices } from 'app/main/admin/providers/providers.service';
import { GeneralServices } from 'services/general.service';
import { ValidatorUtils } from 'utils/validatorutils';

@Component({
    selector: 'generate-term-benefits',
    templateUrl: './generate-term-benefits.component.html',
    styleUrls: ['./generate-term-benefits.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GenerateTermBenefitsComponent implements OnInit {
    title = '';
    buttonConfirm: string = 'btn_gerar';
    buttonCancel: string = 'btn_fechar';
    benefitTermsForm: FormGroup;
    providers: any[] = [];
    benefits: any[] = [];
    types: any[] = [];
    documents: any[] = [];
    entries: any[] = [];
    categories: any[] = [];
    benefitsFiltered: any[] = [];
    providersFiltered: any[] = [];
    categoriesFiltered: any[] = [];
    terms: string;
    showHtmlTerms: boolean = false;

    @ViewChild('term') term: ElementRef;

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<GenerateTermBenefitsComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _providersService: ProvidersServices,
        private _benefitsDocumentsServices: BenefitsDocumentsServices,
        private _benefitsService: BenefitsService,
        private _processBenefitChangesService: ProcessBenefitChangesService,
        private _benefitCategoriesService: BenefitCategoriesService,
        private _validatorUtils: ValidatorUtils,
        private _translateService: TranslateService,
        public _generalServices: GeneralServices,
    ) {
        this.title = _data.title;
        this.buttonConfirm = _data.buttonConfirm ? _data.buttonConfirm : this.buttonConfirm;
        this.buttonCancel = _data.buttonCancel ? _data.buttonCancel : this.buttonCancel;
        this.entries = _data.entries;

        this.benefitTermsForm = this.createBenefitTermsForm();
    }
    ngOnInit(): void {
        Promise.all([
            this._benefitsService.getAll(),
            this._providersService.getAll('BENEFIT'),
            this._benefitsDocumentsServices.getAll(),
            this._benefitsDocumentsServices.getTypesDocuments(),
            this._benefitCategoriesService.getAll('BENEFIT'),
        ]).then((
            [
                benefits, providers, documents, types, categories
            ]
        ) => {
            this.benefits = benefits.benefits;
            // filter benefits returning true if benefit is equal entries.benefit_id or entries.benefit_id_from
            this.benefitsFiltered = this.benefits.filter((benefit) => {
                return this.entries?.some((entry) => {
                    return entry.benefit_id == benefit.id || entry.benefit_id_from == benefit.id;
                });
            });
            this.providers = providers.providers;
            // filter providers returning true if provider is equal entries.provider_id or entries.provider_id_from
            this.providersFiltered = this.providers.filter((provider) => {
                return this.entries?.some((entry) => {
                    return entry.provider_id == provider.id || entry.provider_id_from == provider.id;
                });
            });

            this.documents = documents.benefits_documents;

            this.types = types.options;
            // change mnemonic if key == B
            this.types.forEach((type) => {
                if (type.key == 'B') {
                    type.mnemonic = 'lbl_beneficioNaMovimentacao';
                }
            });

            this.categories = categories.benefit_categories;
            // filter categories returning true if category is equal entries.category_id or entries.category_id_from
            this.categoriesFiltered = this.categories.filter((category) => {
                return this.entries?.some((entry) => {
                    return entry.benefit_category_id == category.id || entry.benefit_category_id_from == category.id;
                });
            });
        });
    }

    confirm() {
        this._processBenefitChangesService.generateBenefitTerms(this.benefitTermsForm.value).then((data) => {
            this.showHtml(data.html);
        });
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

    /**
     * Create form
     *
     * @returns {FormGroup}
     */
    createBenefitTermsForm(): FormGroup {
        let form: FormGroup;
        form = this._formBuilder.group({
            provider_id: new FormControl(null, this._validatorUtils.requiredIf(() => this.benefitTermsForm.get('type').value != 'B')),
            category_id: new FormControl(null, this._validatorUtils.requiredIf(() => this.benefitTermsForm.get('type').value != 'B')),
            benefit_ids: new FormControl(null, this._validatorUtils.requiredIf(() => this.benefitTermsForm.get('type').value == 'B')),
            type: new FormControl(null, Validators.required),
            document_id: new FormControl(null, Validators.required),
            entries: new FormControl(this.entries),
            // no momento nao vai ser necessario
            // group_benefits: new FormControl(false, Validators.required),
        });

        form.get('type').valueChanges.subscribe(() => {
            form.get('provider_id').setValue(null);
            form.get('category_id').setValue(null);
            form.get('benefit_ids').setValue(null);

            form.get('provider_id').updateValueAndValidity();
            form.get('category_id').updateValueAndValidity();
        });

        form.markAllAsTouched();
        return form
    }

    showHtml(html) {
        this.title = this._translateService.instant('aba_termosBeneficios');
        this.terms = html;
        this.showHtmlTerms = true;
        const win: Window = this.term.nativeElement.contentWindow;
        const doc: Document = win.document;

        doc.open();
        doc.write(this.terms);
        doc.close();
    }

    print() {
        this.term.nativeElement.contentWindow.print();
    }
}


