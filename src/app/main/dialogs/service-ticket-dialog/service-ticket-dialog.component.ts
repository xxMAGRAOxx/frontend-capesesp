import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { TranslateService } from '@ngx-translate/core';
import { EmployeesService } from 'app/main/admin/employees/employees.service';
import { ServiceTicketsSupportService } from 'app/main/admin/service-ticket-support/service-tickets-support.service';
import { UsersService } from 'app/main/admin/users/users.service';
import { WalletDocumentsSettingsService } from 'app/main/admin/wallet-documents-settings/wallet-documents-settings.service';
import { EmployeeType } from 'app/types/employee.type';
import { UsersType } from 'app/types/users.type';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { ServiceTicketsAdminServices } from 'services/admin/service-tickets-admin.service';
import { ServiceTicketsTypesAdminServices } from 'services/admin/service-tickets-types-admin.service';
import { ServiceTicketsServices } from 'services/employee/service-tickets-employee.service';
import { ServiceTicketsTypesServices } from 'services/employee/service-tickets-types-employee.service';
import { GeneralServices } from 'services/general.service';
import { ValidatorUtils } from 'utils/validatorutils';

@Component({
    selector: 'service-ticket-dialog',
    templateUrl: './service-ticket-dialog.component.html',
    styleUrls: ['./service-ticket-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ServiceTicketDialogComponent implements OnInit {

    dataForm: FormGroup;
    serviceTicketTypes: any;
    filteredServiceTicketTypes: any[];
    serviceTicketCategories: any[];
    priorityTypes: any;
    uploadDataForm: FormGroup;
    idRequest: number;
    user: any;
    users: UsersType[];
    walletDocumentsSettings: any;
    providers: any;
    observers: UsersType[]
    role: string;
    employees: EmployeeType;
    isRefundable: boolean;
    benefits: any[];
    relatives: any[];
    relativesFiltered: any[];
    allowRelatives: boolean;
    noteMaxDate: any
    noteMinDate: any
    balance: number;
    refundLimit: number;
    refundUsed: number;
    receivedReadOnly: boolean;
    allowReceived: boolean;
    isPercentualReceived: boolean;
    description: string;
    hasApprove = false;
    processing = false;
    type: string;
    initialDate;
    finalDate;
    relatedServiceTicketId: number | null;

    serviceTypeAllowedOpening: boolean = true;
    serviceTypeAllowedOpeningType: boolean = true;
    serviceTypeMerelyInformative: boolean = false;

    default_opening_text: string;

    allowedFileTypes = '.pdf, image/png, image/jpeg, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/zip, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation';

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ServiceTicketDialogComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<ServiceTicketDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _serviceTicketServices: ServiceTicketsServices,
        private _serviceTicketAdminServices: ServiceTicketsAdminServices,
        private _serviceTicketTypes: ServiceTicketsTypesServices,
        private _serviceTicketAdminTypes: ServiceTicketsTypesAdminServices,
        private _employeeService: EmployeesService,
        private _validatorUtils: ValidatorUtils,
        private _serviceTicketSupport: ServiceTicketsSupportService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private _translateService: TranslateService,
        public _generalServices: GeneralServices,
        private _userService: UsersService,
        private _walletDocumentsSettingsService: WalletDocumentsSettingsService,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.user = this._generalServices.user;
        this.isRefundable = _data[0].isRefundable ? _data[0].isRefundable : false;
        this.relatedServiceTicketId = _data[0].relatedServiceTicketId;
        this.relatives = [];
        this.benefits = [];
        this.relativesFiltered = [];
        this.allowRelatives = false;
        this.noteMaxDate = moment();
        this.noteMinDate = moment().subtract(1, 'y');
        this.balance = 0;
        this.refundLimit = 0;
        this.refundUsed = 0;
        this.receivedReadOnly = false;
        this.allowReceived = false;
        this.isPercentualReceived = false;
        this.type = 'C';
    }

    ngOnInit(): void {
        this.role = this._data[0].role
        this.dataForm = this.openForm();

        if (this._data[0].role == 'admin') {
            this._userService.getUsers().then(result => {
                this.observers = result.filter((val) => val.id !== this._generalServices.user.id && val.active)
                this.users = result.filter(user => user.id !== this._generalServices.user.id && user.active)
            });
            this._employeeService.getAll(true, 'simple').then(result => {
                this.employees = result.employees
            }, (error: any) => {
                if (error.status == 401) {
                    sessionStorage.setItem('cruzzyapp_auth-token', '');
                    window.location.href = '/auth/login';
                } else {
                    console.log(error)
                    this._snackBar.open(this._translateService.instant('msg_erroPadrao'), 'X', { duration: 60000, panelClass: 'error-snackbar' });
                }
            });
            this._serviceTicketAdminTypes.getAll(true, true, true).subscribe(result => {
                this.serviceTicketTypes = this.isRefundable ? result.service_types.filter(type => type.service_ticket_type === 'RE') : result.service_types.filter(type => type.service_ticket_type !== 'RE' && (!type.service_ticket_audience || (type.service_ticket_audience === 'A' || type.service_ticket_audience === 'C')))

                if (this.serviceTicketCategories && this.serviceTicketCategories.length > 0) {
                    this.filteredServiceTicketTypes = [];
                } else {
                    this.filteredServiceTicketTypes = this.serviceTicketTypes
                }
            }, (error: any) => {
                if (error.status == 401) {
                    sessionStorage.setItem('cruzzyapp_auth-token', '');
                    window.location.href = '/auth/login';
                } else {
                    console.log(error)
                    this._snackBar.open(this._translateService.instant('msg_erroPadrao'), 'X', { duration: 60000, panelClass: 'error-snackbar' });
                }
            });
            this._serviceTicketAdminServices.getPriorityTypes().subscribe(result => {
                this.priorityTypes = result.options
            }, (error: any) => {
                if (error.status == 401) {
                    sessionStorage.setItem('cruzzyapp_auth-token', '');
                    window.location.href = '/auth/login';
                } else {
                    console.log(error)
                    this._snackBar.open(this._translateService.instant('msg_erroPadrao'), 'X', { duration: 60000, panelClass: 'error-snackbar' });
                }
            });

            if (this.dataForm.get('on_behalf_of').value) {
                this.dataForm.get('requesting_employee_id').setValue(null);
                this.dataForm.get('responsible_employee_id').setValue(null);
                this.dataForm.get('responsible_user_id').setValue(this._generalServices.user.id);
                this.dataForm.get('requesting_user_id').setValue(null);
            }

            this.dataForm.controls.requesting_employee_id.valueChanges.subscribe((value) => {
                if (this.dataForm.get('on_behalf_of').value && value) {
                    this._serviceTicketAdminTypes.getAllByRequestingId(value).subscribe(result => {
                        this.dataForm.controls.service_type_id.setValue(null);
                        this.dataForm.controls.service_ticket_category_id.setValue(null);
                        this.serviceTicketTypes = result.service_types
                        if (this.serviceTicketCategories && this.serviceTicketCategories.length > 0) {
                            this.filteredServiceTicketTypes = [];
                        } else {
                            this.filteredServiceTicketTypes = this.serviceTicketTypes
                        }
                    });
                }
            });
        } else if (this._data[0].role == 'support') {
            this._userService.getUsersAllCompanies().then(result => {
                this.users = result
            });
            this._userService.getUsers().then(result => {
                this.observers = result.filter((val) => val.id !== this._generalServices.user.id)
            });
            this._serviceTicketSupport.getAllSupportTypes(true).then(result => {
                this.serviceTicketTypes = result
                this.filteredServiceTicketTypes = this.serviceTicketTypes
            });
            this._serviceTicketAdminServices.getPriorityTypes().subscribe(result => {
                this.priorityTypes = result.options
            }, (error: any) => {
                if (error.status == 401) {
                    sessionStorage.setItem('cruzzyapp_auth-token', '');
                    window.location.href = '/auth/login';
                } else {
                    console.log(error)
                    this._snackBar.open(this._translateService.instant('msg_erroPadrao'), 'X', { duration: 60000, panelClass: 'error-snackbar' });
                }
            });

            //Caso não for a tutto abrindo o chamado ele seta on_behalf_of como false e seta o usuario abrindo como o requesting
            if (this._generalServices.user.customer_id !== 25) {
                this.dataForm.get('on_behalf_of').setValue(false, { emitEvent: false })
                this.dataForm.get('requesting_user_id').setValue(this._generalServices.user.id)
            }
        } else {
            this._serviceTicketTypes.getAll(true).subscribe(result => {
                this.serviceTicketTypes = result.service_types
                if (this.serviceTicketCategories && this.serviceTicketCategories.length > 0) {
                    this.filteredServiceTicketTypes = [];
                } else {
                    this.filteredServiceTicketTypes = this.serviceTicketTypes
                }
            }, (error: any) => {
                if (error.status == 401) {
                    sessionStorage.setItem('cruzzyapp_auth-token', '');
                    window.location.href = '/auth/login';
                } else {
                    console.log(error)
                    this._snackBar.open(this._translateService.instant('msg_erroPadrao'), 'X', { duration: 60000, panelClass: 'error-snackbar' });
                }
            });
            this._serviceTicketServices.getPriorityTypes().subscribe(result => {
                this.priorityTypes = result.options
            }, (error: any) => {
                if (error.status == 401) {
                    sessionStorage.setItem('cruzzyapp_auth-token', '');
                    window.location.href = '/auth/login';
                } else {
                    console.log(error)
                    this._snackBar.open(this._translateService.instant('msg_erroPadrao'), 'X', { duration: 60000, panelClass: 'error-snackbar' });
                }
            });
        }

        if (this._generalServices.user.type == 'customer') {
            this._serviceTicketAdminServices.getCategories().subscribe((val) => {
                this.serviceTicketCategories = val.service_ticket_categories;

                if (this.serviceTicketCategories.length > 0) {
                    this.serviceTicketCategories.push({
                        active: true,
                        companies: [],
                        companies_id: [],
                        companies_names: "",
                        description: this._translateService.instant('hint_naoCategorizavel'),
                        id: 0,
                        name: this._translateService.instant('lbl_naoCategorizavel'),
                        service_types: []
                    })
                }
            });
            if (this.isRefundable) {
                this.dataForm.controls.requesting_employee_id.valueChanges.subscribe((value) => {
                    this._serviceTicketAdminTypes.getMostUsedProviders(value).subscribe((data) => {
                        this.providers = data.employee_providers;
                    });
                });
                this._walletDocumentsSettingsService.getAll().then((data) => {
                    this.walletDocumentsSettings = data[0];
                });
            }
        }

        if (this._generalServices.user.type == 'employee') {
            this._serviceTicketAdminServices.employeeGetCategories().subscribe((val) => {
                this.serviceTicketCategories = val.service_ticket_categories;

                if (this.serviceTicketCategories.length > 0) {
                    this.serviceTicketCategories.push({
                        active: true,
                        companies: [],
                        companies_id: [],
                        companies_names: "",
                        description: this._translateService.instant('hint_naoCategorizavel'),
                        id: 0,
                        name: this._translateService.instant('lbl_naoCategorizavel'),
                        service_types: []
                    })
                }
            });

            this.dataForm.controls.service_type_id.valueChanges.subscribe((value) => {
                this.isRefundable = this.filteredServiceTicketTypes.filter(type => type.id == value && type.service_ticket_type == 'RE').length > 0 ? true : false;

                if (this.isRefundable) {
                    this._serviceTicketAdminTypes.getMostUsedProviders(this._generalServices.user.id).subscribe((data) => {
                        this.providers = data.employee_providers;
                    });
                    this.walletDocumentsSettings = this._generalServices.user.service_ticket_refund_settings;
                }

                this.serviceTypeAllowedOpening = true;
                this.serviceTypeAllowedOpeningType = true;
                this.serviceTypeMerelyInformative = false;
            });
        }

        this.dataForm.get('on_behalf_of').valueChanges.subscribe((value) => {
            if (value) {
                this.serviceTicketTypes.filter((e) => e.id == this.dataForm.get('service_type_id').value)[0]?.files?.length > 0 ?
                    this.newRequired(this.serviceTicketTypes.filter((e) => e.id == this.dataForm.get('service_type_id')?.value)[0]?.files)
                    :
                    this.newRequired(null)
            } else {
                this.newRequired(null)
            }
        });

        this.dataForm.get('employee_admin').valueChanges.subscribe((value) => {
            if (!value && this.serviceTicketTypes.filter((e) => e.id == this.dataForm.get('service_type_id').value)[0]?.files?.length > 0) {
                this.newRequired(this.serviceTicketTypes.filter((e) => e.id == this.dataForm.get('service_type_id').value)[0].files);
                this.dataForm.updateValueAndValidity();
            }
        })


        this.dataForm.get('service_type_id').valueChanges.subscribe((value) => {
            if (this.serviceTicketTypes.filter(type => type.id == this.dataForm.get('service_type_id').value && type.service_ticket_type !== null).length > 0 && this.dataForm.get('requesting_employee_id').value != null) {
                this.getDetails(value);
                this.dataForm.updateValueAndValidity();
            } else {
                this.isRefundable = this._data[0].role === 'admin' && this._data[0].isRefundable ? true : false;
                this.resetRefundableForm();

            }

            if (this.serviceTicketTypes.filter((val) => val.id === value).length > 0) {
                this.dataForm.get('description').setValue(this.serviceTicketTypes.find((val) => val.id === value).default_opening_text, { emitEvent: false })
            }

            this.serviceTicketTypes.filter((e) => e.id == value)[0]?.files?.length > 0 ?
                this.newRequired(this.serviceTicketTypes.filter((e) => e.id == value)[0].files)
                :
                this.newRequired(null)

            this.serviceTicketTypes.filter((e) => e.id == value)[0]?.informational_files.length > 0 ?
                (
                    this.newInformational(this.serviceTicketTypes.filter((e) => e.id == value)[0]?.informational_files)
                )
                :
                (
                    this.newInformational(null)
                )

            this.serviceTicketTypes.filter((e) => e.id == value)[0]?.informational_links.length > 0 ?
                (
                    this.newInformationalLinks(this.serviceTicketTypes.filter((e) => e.id == value)[0]?.informational_links)
                )
                :
                (
                    this.newInformationalLinks(null)
                )
        });

        this.dataForm.get('requesting_employee_id').valueChanges.subscribe(value => {
            if (this.dataForm.get('service_type_id').value != null && this.serviceTicketTypes.filter(type => type.id == this.dataForm.get('service_type_id').value && type.service_ticket_type !== null).length > 0) {
                this.getDetails(this.dataForm.get('service_type_id').value);
                this.dataForm.get('relatives').setValue(null);
                this.dataForm.get('benefit_id').setValue(null);
                this.refundLimit = 0
                this.dataForm.updateValueAndValidity();
            } else {
                this.resetRefundableForm();
            }
        })

        this.dataForm.get('benefit_id').valueChanges.subscribe(benefitId => {
            let benefitsFiltered = this.benefits.filter(benefit => benefit.id == benefitId && benefit.relative == true)
            if (benefitsFiltered && benefitsFiltered.length > 0 && benefitsFiltered[0].employee_relatives && benefitsFiltered[0].employee_relatives.length > 0) {
                this.relativesFiltered = benefitsFiltered[0].employee_relatives
                if (this.relativesFiltered.length > 0) {
                    this.allowRelatives = true
                }
            } else {
                this.allowRelatives = false
            }
        })

        this.dataForm.get('requiredFiles').valueChanges.subscribe((a) => {
            if (a && (this.dataForm.get('on_behalf_of').value || this.user.type == 'employee' || !this.dataForm.get('employee_admin').value)) {
                a.map(value => {
                    if (value.file_name == null) {
                        this.dataForm.get('requiredFiles').setErrors({ invalid: true });
                        this.dataForm.updateValueAndValidity();
                    } else if (this.dataForm.hasError('invalid')) {
                        this.dataForm.get('requiredFiles').setErrors({ invalid: true });
                        this.dataForm.updateValueAndValidity();
                    }
                })
            }
        });
    }

    selectedProvider(event) {
        if (event) {
            this.dataForm.controls.vat.setValue(this.providers.filter(provider => provider.vat == event)[0].vat);
            this.dataForm.controls.provider_name.setValue(this.providers.filter(provider => provider.vat == event)[0].name);
        } else {
            this.dataForm.controls.vat.setValue(null);
            this.dataForm.controls.provider_name.setValue(null);
        }
    }

    hasFiles() {
        if (this.serviceTicketTypes && this.dataForm && this.serviceTicketTypes.find((e) => e.id == this.dataForm.get('service_type_id').value) && this.serviceTicketTypes.find((e) => e.id == this.dataForm.get('service_type_id').value).files.length > 0) {
            return true;
        } else {
            return false;
        }
        // return this.serviceTicketTypes.find((e) => e.id == this.dataForm.get('service_type_id').value)
    }

    resetRefundableForm() {
        this.dataForm.get('benefit_id').setValue(null)
        this.dataForm.get('relatives').setValue(null)
        this.dataForm.get('document_number').setValue(null)
        this.dataForm.get('emission_date').setValue(null)
        this.dataForm.get('vat').setValue(null)
        this.dataForm.get('provider_name').setValue(null)
        this.dataForm.get('service_value').setValue(null)
        this.dataForm.get('received_value').setValue(null)
        this.dataForm.get('requested_value').setValue(null)
        this.dataForm.get('refund_value').setValue(null)
        this.dataForm.get('reference').setValue(null)
        this.dataForm.get('justification').setValue(null)
        this.dataForm.get('justification_motive').setValue(null)
        this.dataForm.updateValueAndValidity();
    }

    getDetails(value) {
        this._serviceTicketSupport.getMoreDetailTypes(value, this.dataForm.get('requesting_employee_id').value).then((result) => {
            this.isRefundable = true;
            this.benefits = result.benefits;
            this.balance = result.employee_balance;
            if (this.dataForm.get('benefit_id').value) {
                let benefit = this.benefits.filter(benefit => benefit.id == this.dataForm.get('benefit_id').value)[0];
                this.refundUsed = benefit.total_employee_refund;
                this.refundLimit = benefit.anual_refund_limit
                this.validateMotive();
            }
        });
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
     * abre o formulario vazio
     */
    openForm(): FormGroup {
        var form: FormGroup;
        let files = new FormArray([]);
        let requiredFiles = new FormArray([]);
        let informationalFiles = new FormArray([]);
        let informationalLinks = new FormArray([]);

        form = this._formBuilder.group({
            closed: [false],
            employee_id: [],
            id: [null],
            priority: ['N', Validators.required],
            description: [null, Validators.required],
            name: [null, Validators.required],
            service_type_id: [null, Validators.required],
            max_hours_answer: [null],
            situation: [],
            user_id: [],
            // user_customer_id: [this._data[0].userClientId ? this._data[0].userClientId : null, this._validatorUtils.requiredIf(() => this.role == 'support' && this._generalServices.user.customer_id == 25)],
            files: files,
            requiredFiles: requiredFiles,
            opening_date: [],
            replies: [],
            benefit_id: [null, this._validatorUtils.requiredIf(() => this.isRefundable == true)],
            relatives: [null],
            document_number: [null, this._validatorUtils.requiredIf(() => this.walletDocumentsSettings?.required_fiscal_documents)],
            emission_date: [null, this._validatorUtils.requiredIf(() => this.walletDocumentsSettings?.required_fiscal_documents)],
            vat: [null, this._validatorUtils.requiredIf(() => this.walletDocumentsSettings?.required_fiscal_documents)],
            provider_id: [null],
            provider_name: [null, this._validatorUtils.requiredIf(() => this.walletDocumentsSettings?.required_fiscal_documents)],
            service_value: [null, this._validatorUtils.requiredIf(() => this.isRefundable == true)],
            received_value: [null],
            requested_value: [null, this._validatorUtils.requiredIf(() => this.isRefundable == true)],
            refund_value: [],
            reference: [],
            observers: [[]],
            justification: [null, this._validatorUtils.requiredIf(() => form.get('justification_motive').value != null)],
            justification_motive: [],
            responsible_user_id: [null],
            requesting_user_id: [this._data[0].userId && this.role === 'admin' ? this._data[0].userId : this.role === 'support' && this._data[0].userClientId ? this._data[0].userClientId : null, this._validatorUtils.requiredIf(() => this.role == 'support' && this._generalServices.user.customer_id == 25)],
            responsible_employee_id: [null, this._validatorUtils.requiredIf(() => this.dataForm.get('on_behalf_of').value == false && this.dataForm.get('employee_admin').value == true && this.role == 'admin')],
            requesting_employee_id: [this._data[0].employeeId ? this._data[0].employeeId : null, this._validatorUtils.requiredIf(() => this.dataForm.get('on_behalf_of').value == true && this.dataForm.get('employee_admin').value == true && this.role == 'admin')],
            opener_user_id: [this._data[0].userId ? this._data[0].userId : null],
            on_behalf_of: [this.isRefundable || this.role === 'support' ? true : false],
            employee_admin: [true],
            related_employee_id: new FormControl(),
            related_employee_name: new FormControl(),
            support: [this.role === 'support' ? true : false],
            responsible_approve: [true],
            informational_files: informationalFiles,
            informational_links: informationalLinks,
            service_ticket_category_id: new FormControl(null, this._validatorUtils.requiredIf(() => this.serviceTicketCategories && this.serviceTicketCategories.length > 0 && this.role !== 'support')),
            related_service_ticket_id: this.relatedServiceTicketId
        });

        form.controls.service_ticket_category_id.valueChanges.subscribe((val) => {
            if (val) {
                let category = this.serviceTicketCategories.find((cat) => cat.id === val);
                this.filteredServiceTicketTypes = this.serviceTicketTypes.filter((type) => category.service_types.indexOf(type.id) > -1);
            } else {
                if (val === 0) {
                    this.filteredServiceTicketTypes = this.serviceTicketTypes.filter((type) => !type.service_ticket_category_id)
                } else {
                    this.filteredServiceTicketTypes = []
                }
            }
            this.dataForm.get('service_type_id').setValue(null)
            this.serviceTypeAllowedOpening = true;
            this.serviceTypeAllowedOpeningType = true;
            this.serviceTypeMerelyInformative = false;
        });

        form.controls.on_behalf_of.valueChanges.subscribe((val) => {
            if (val) {
                this.dataForm.get('requesting_employee_id').setValue(this.dataForm.get('responsible_employee_id').value);
                this.dataForm.get('responsible_employee_id').setValue(null);
                this.dataForm.get('responsible_user_id').setValue(this._generalServices.user.id);
                this.dataForm.get('requesting_user_id').setValue(null);
            } else {
                this.dataForm.get('responsible_employee_id').setValue(this.dataForm.get('requesting_employee_id').value);
                this.dataForm.get('requesting_employee_id').setValue(null);
                this.dataForm.get('requesting_user_id').setValue(this._generalServices.user.id);
                this.dataForm.get('responsible_user_id').setValue(null);
            }

            this.updateAndValidityEmployeeUser();
        })

        form.controls.employee_admin.valueChanges.subscribe((val) => {
            if (val) {
                this.dataForm.get('on_behalf_of').setValue(false, { emitEvent: false });
                this.dataForm.get('responsible_employee_id').setValue(null);
                this.dataForm.get('requesting_employee_id').setValue(null);
                this.dataForm.get('requesting_user_id').setValue(null);
                this.dataForm.get('responsible_user_id').setValue(this._generalServices.user.id);
            } else {
                this.dataForm.get('on_behalf_of').setValue(false, { emitEvent: false });
                this.dataForm.get('responsible_employee_id').setValue(null);
                this.dataForm.get('requesting_employee_id').setValue(null);
                this.dataForm.get('requesting_user_id').setValue(this._generalServices.user.id);
                this.dataForm.get('responsible_user_id').setValue(null);
            }

            this.serviceTypeAllowedOpening = true;

            this.updateAndValidityEmployeeUser();
        })

        // Adiciona a validação de intervalo de pontos
        form.controls.received_value.setValidators([
            this._validatorUtils.requiredIf(() => this.isRefundable == true && this.allowReceived),
            (control: AbstractControl) => this._validatorUtils.valueInterval(form.get('received_value').value, form.get('service_value').value, true)(control),
            (control: AbstractControl) => {
                if ((control.value || control.value === 0) && (this.allowReceived)) {
                    return this._validatorUtils.valueInterval(0, form.get('received_value').value, true)(control)
                }
            }
        ]);
        form.controls.requested_value.setValidators([
            this._validatorUtils.requiredIf(() => this.isRefundable == true),
            (control: AbstractControl) => this._validatorUtils.valueInterval(form.get('requested_value').value, form.get('service_value').value - form.get('received_value').value, true)(control)
        ]);

        // Subscreve a validação na alteração dos campos
        form.get('service_value').valueChanges.subscribe(a => {
            form.get('received_value').updateValueAndValidity({ onlySelf: true, emitEvent: false });
            form.get('requested_value').updateValueAndValidity({ onlySelf: true, emitEvent: false });
            this.validateRefund('service_value');
        });
        form.get('received_value').valueChanges.subscribe(a => {
            form.get('received_value').updateValueAndValidity({ onlySelf: true, emitEvent: false });
            form.get('requested_value').updateValueAndValidity({ onlySelf: true, emitEvent: false });
            this.validateRefund('received_value');
        });
        form.get('requested_value').valueChanges.subscribe(a => {
            form.get('received_value').updateValueAndValidity({ onlySelf: true, emitEvent: false });
            form.get('requested_value').updateValueAndValidity({ onlySelf: true, emitEvent: false });
            form.get('justification').updateValueAndValidity({ onlySelf: true, emitEvent: false });
            if (this.dataForm.get('benefit_id').value) {
                this.validateMotive();
            }
        });

        form.get('emission_date').valueChanges.subscribe(a => {
            if (this.dataForm.get('benefit_id').value) {
                this.validateMotive();
            }
        })

        form.get('benefit_id').valueChanges.subscribe(benefitId => {
            if (benefitId) {
                let benefit = this.benefits.filter(benefit => benefit.id == this.dataForm.get('benefit_id').value)[0];
                this.validateRefund();
                this.refundUsed = benefit.total_employee_refund;
                this.refundLimit = this.benefits.filter(benefit => benefit.id == benefitId)[0].anual_refund_limit
                this.description = this.benefits.filter(benefit => benefit.id == benefitId)[0].description
                this.dataForm.get('relatives').setValue(null);
                if (this.dataForm.get('emission_date').value) {
                    this.validateMotive();
                }
            } else {
                this.description = null
            }
        })

        form.get('relatives').valueChanges.subscribe((relativeId) => {
            if (this.dataForm.get('benefit_id').value) {
                let benefit = this.benefits.filter(benefit => benefit.id == this.dataForm.get('benefit_id').value)[0];
                if (relativeId) {
                    this.refundUsed = benefit.employee_relatives.filter(relative => relative.id == relativeId)[0].total_relative_refund;
                } else {
                    this.refundUsed = benefit.total_employee_refund;
                }
                if (this.dataForm.get('benefit_id').value && this.dataForm.get('emission_date').value) {
                    this.validateMotive();
                }
            }
        })

        form.markAllAsTouched();

        return form;
    }

    updateAndValidityEmployeeUser() {
        this.dataForm.get('responsible_employee_id').updateValueAndValidity();
        this.dataForm.get('requesting_employee_id').updateValueAndValidity();
        this.dataForm.get('requesting_user_id').updateValueAndValidity();
        this.dataForm.get('responsible_user_id').updateValueAndValidity();
    }

    validateRefund(field = null) {
        let benefit = this.benefits.filter(benefit => benefit.id == this.dataForm.get('benefit_id').value)[0];

        if (benefit && benefit.percentual_refund) {
            this.receivedReadOnly = true;
            this.allowReceived = true;
            this.isPercentualReceived = true;
            if (field == 'service_value') {
                this.dataForm.get('received_value').setValue(this.dataForm.get('service_value').value * (benefit.refund_percentage / 100));
                this.dataForm.get('requested_value').setValue(this.dataForm.get('service_value').value - this.dataForm.get('received_value').value);
            }
        } else if (benefit && benefit.provider_refund) {
            if (field == 'service_value' || field == 'received_value') {
                // this.dataForm.get('received_value').setValue(0);
                this.dataForm.get('requested_value').setValue(this.dataForm.get('service_value').value - this.dataForm.get('received_value').value);
            }
            this.receivedReadOnly = false;
            this.allowReceived = true;
            this.isPercentualReceived = false;
        } else {
            if (field == null) {
                this.dataForm.get('received_value').setValue(0);
                this.dataForm.get('requested_value').setValue(this.dataForm.get('service_value').value);
            }
            this.receivedReadOnly = false;
            this.allowReceived = false;
        }
    }

    validateMotive() {
        let benefitSelected = this.benefits.filter(benefit => benefit.id == this.dataForm.get('benefit_id').value)[0];
        let balanceExceeded = this.dataForm.get('requested_value').value > this.balance;
        let refundExceeded = false;
        let dateIsSameOrAfter = null;

        if (benefitSelected.anual_refund_limit) {
            if (this.dataForm.get('relatives').value) {
                let relativeBalance = benefitSelected.employee_relatives.filter(relative => relative.id == this.dataForm.get('relatives').value)[0];
                refundExceeded = relativeBalance.total_relative_refund + this.dataForm.get('requested_value').value > benefitSelected.anual_refund_limit;
            } else {
                refundExceeded = benefitSelected.total_employee_refund + this.dataForm.get('requested_value').value > benefitSelected.anual_refund_limit;
            }
        }
        if (benefitSelected.max_refund_days) {
            dateIsSameOrAfter = !moment(this.dataForm.get('emission_date').value).isSameOrAfter(moment().subtract(benefitSelected.max_refund_days, 'd'));

            if (this.dataForm.get('emission_date').value == null) {
                dateIsSameOrAfter = false;
            }
        }

        let motive = '';

        if (balanceExceeded) {
            motive += 'S';
        }
        if (dateIsSameOrAfter) {
            motive += 'P';
        }
        if (refundExceeded) {
            motive += 'L';
        }

        this.dataForm.get('justification_motive').setValue(motive == '' ? null : motive)
        this.dataForm.get('justification').updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }

    validateGender() {

    }

    /**
     * Salva o chamado
     */
    saveTicket(): void {
        this._fuseProgressBarService.show();
        this.processing = true;
        // mantem o campo relatives como array mesmo quando allow_multiple_dependents for false
        if (!this.walletDocumentsSettings?.allow_multiple_dependents) {
            let relatives = [this.dataForm.get('relatives').value];
            this.dataForm.get('relatives').setValue(relatives);
        }
        this.dataForm.get('requiredFiles')?.value.map(a => this.dataForm.get('files')?.value.push(a))
        if (this._data[0].role == 'admin' || this._data[0].role == 'support') {
            if (this._data[0].role === 'support') {
                this.dataForm.get('responsible_employee_id').setValue(null);
                this.dataForm.get('requesting_employee_id').setValue(null);
            }
            this._serviceTicketAdminServices.save(null, this.dataForm.value).subscribe(result => {
                let promises = [];

                // não tem nenhum arquivo opcional nem obrigatorio a ser enviado entao somente fecha o modal
                if (!(this.dataForm.get('files').value.filter((file) => file.file)?.length > 0) && (this.dataForm.get('files_required_data')?.value.filter((file) => file.file)?.length > 0)) {
                    this._snackBar.open(this._translateService.instant('msg_sucessoPadrao'), 'X', { panelClass: 'success-snackbar' });
                    this.matDialogRef.close(['yes']);
                }

                // tem arquivos opcionais a serem enviados, pra cada arquivo adiciona item no promiseAll
                if (this.dataForm.get('files').value.filter((file) => file.file).length > 0) {
                    let i = 0;

                    for (let file of this.dataForm.get('files').value.filter((file) => file.file)) {
                        promises.push(this._serviceTicketAdminServices.uploadFile(result.id, file, i++).toPromise())
                    }
                }

                // tem arquivos obrigatorios a serem enviados, pra cada arquivo adiciona item no promiseAll
                if (this.dataForm.get('files_required_data') && this.dataForm.get('files_required_data')?.value.filter((file) => file.file)?.length > 0) {
                    let i = 0;

                    for (let file of this.dataForm.get('files_required_data')?.value.filter((file) => file.file)) {
                        promises.push(this._serviceTicketAdminServices.uploadFile(result.id, file, i++).toPromise())
                    }
                }

                Promise.all(promises).then(() => {
                    this._snackBar.open(this._translateService.instant('msg_sucessoPadrao'), 'X', { panelClass: 'success-snackbar' });
                    this.matDialogRef.close(['yes']);
                }).catch(() => {
                    this._snackBar.open(this._translateService.instant('msg_sucessocomAlgunsErros'), 'X', { duration: 60000, panelClass: 'error-snackbar' });
                    this.matDialogRef.close(['yes']);
                });
            }, (error: any) => {
                if (error.status == 401) {
                    sessionStorage.setItem('cruzzyapp_auth-token', '');
                    window.location.href = '/auth/login';
                    this._fuseProgressBarService.hide();
                } else {
                    this._snackBar.open(this._translateService.instant('msg_erroPadrao'), 'X', { duration: 60000, panelClass: 'error-snackbar' });
                    this.processing = false;
                    this._fuseProgressBarService.hide();
                }
            });
        } else {
            this._serviceTicketServices.save(null, this.dataForm.value).subscribe(result => {
                let promises = [];

                // não tem nenhum arquivo opcional nem obrigatorio a ser enviado entao somente fecha o modal
                if (!(this.dataForm.get('files').value.filter((file) => file.file)?.length > 0)) {
                    this._snackBar.open(this._translateService.instant('msg_sucessoPadrao'), 'X', { panelClass: 'success-snackbar' });
                    this.matDialogRef.close(['yes']);
                }

                // tem arquivos a serem enviados, pra cada arquivo adiciona item no promiseAll
                if (this.dataForm.get('files').value.filter((file) => file.file).length > 0) {
                    let i = 0;
                    for (let file of this.dataForm.get('files').value.filter((file) => file.file)) {
                        promises.push(this._serviceTicketServices.uploadFile(result.id, file, i++).toPromise())
                    }
                }

                Promise.all(promises).then(() => {
                    this._snackBar.open(this._translateService.instant('msg_sucessoPadrao'), 'X', { panelClass: 'success-snackbar' });
                    this.matDialogRef.close(['yes']);
                }).catch(() => {
                    this._snackBar.open(this._translateService.instant('msg_sucessocomAlgunsErros'), 'X', { duration: 60000, panelClass: 'error-snackbar' });
                    this.matDialogRef.close(['yes']);

                });
            }, (error: any) => {
                if (error.status == 401) {
                    sessionStorage.setItem('cruzzyapp_auth-token', '');
                    window.location.href = '/auth/login';
                    this._fuseProgressBarService.hide();
                } else {
                    this._snackBar.open(this._translateService.instant('msg_erroPadrao'), 'X', { duration: 60000, panelClass: 'error-snackbar' });
                    this._fuseProgressBarService.hide();
                }
            });
        }
    }

    /**
     * deleta arquivos
     */
    deleteFile(i) {
        let files = this.dataForm.controls.files as FormArray;
        files.removeAt(i);
    }

    /**
     * cria arquivos
     */
    newFile() {
        let files = this.dataForm.controls.files as FormArray;
        files.push(new FormGroup({
            id: new FormControl(),
            date: new FormControl(),
            file_name: new FormControl(),
            file_type: new FormControl(),
            file: new FormControl(),
            file_url: new FormControl(),
            downloadable_file_name: new FormControl(),
            document_name: new FormControl(null, Validators.required),
            azure_file_id: new FormControl(null, Validators.required),
            ticket_interaction_id: new FormControl(),
            required_service_type_file_id: new FormControl(),
            document_title: new FormControl()
        }))
        files.markAllAsTouched()
    }

    /**
     * cria arquivos que sao requeridos
     */
    newRequired(document_name): void {
        let files = this.dataForm.controls.requiredFiles as FormArray;
        while (files.length !== 0) {
            files.removeAt(0)
        }
        if (document_name != null) {
            for (let i = 0; i < document_name.length; i++) {
                let model = this.newFileModel(document_name[i].required_file_model)
                files.push(new FormGroup({
                    id: new FormControl(),
                    date: new FormControl(),
                    file_name: new FormControl(),
                    file_type: new FormControl(),
                    file: new FormControl(),
                    file_url: new FormControl(),
                    document_name: new FormControl(document_name[i].required_file_name),
                    downloadable_file_name: new FormControl(document_name[i].downloadable_file_name),
                    azure_file_id: new FormControl(null, this.dataForm.get('on_behalf_of').value == true || this.user.type == 'employee' || !this.dataForm.get('employee_admin').value ? Validators.required : null),
                    ticket_interaction_id: new FormControl(),
                    required_service_type_file_id: new FormControl(),
                    document_title: new FormControl(),
                    required_file_model: model
                }))
            }
        }
    }

    /**
     * cria arquivos que sao complementares
     */
    newInformational(document_name): void {
        let files = this.dataForm.controls.informational_files as FormArray;
        while (files.length !== 0) {
            files.removeAt(0);
        }
        if (document_name != null) {
            for (let i = 0; i < document_name.length; i++) {
                files.push(new FormGroup({
                    id: new FormControl(document_name[i].id),
                    file_name: new FormControl(document_name[i].file_name),
                    file_type: new FormControl(document_name[i].file_type),
                    downloadable_file_name: new FormControl(document_name[i].downloadable_file_name),
                    file: new FormControl(document_name[i].file),
                    file_url: new FormControl(document_name[i].file_url),
                    document_name: new FormControl(document_name[i].document_name),
                    azure_file_id: new FormControl(document_name[i].azure_file_id),
                }));
            }
        }
    }

    newFileModel(models): FormArray {
        let newModel = new FormArray([]);
        for (let i = 0; i < models?.length; i++) {
            newModel.push(new FormGroup({
                id: new FormControl(models[i].id),
                date: new FormControl(),
                file_url: new FormControl(models[i].file_url),
                file: new FormControl(models[i].file),
                file_name: new FormControl(models[i].file_name),
                file_type: new FormControl(models[i].file_type),
                document_name: new FormControl(models[i].document_name),
                downloadable_file_name: new FormControl(models[i].downloadable_file_name),
                azure_file_id: new FormControl(models[i].azure_file_id),
            }));
        }
        return newModel;
    }

    newInformationalLinks(links): void {
        let informational_links = this.dataForm.controls.informational_links as FormArray;

        if (links == null) {
            informational_links.clear();
            return;
        }

        links.map((link) => {
            if (link.active) {
                informational_links.push(new FormGroup({
                    id: new FormControl({ value: link.id, disabled: true }),
                    link: new FormControl({ value: link.link, disabled: true }),
                    name: new FormControl({ value: link.name, disabled: true }),
                }));
            }
        });
    }

    /**
     * retrona os controls de um file criado
     */
    getControls(required?: string) {
        return required ? (this.dataForm.get('requiredFiles') as FormArray).controls
            : this.dataForm.get('files') ?
                (this.dataForm.get('files') as FormArray).controls
                : new FormArray([]);
    }

    getControlsModels(index) {
        return (this.dataForm.get('requiredFiles') as FormArray).controls[index].get('required_file_model') ? ((this.dataForm.get('requiredFiles') as FormArray).controls[index].get('required_file_model') as FormArray).controls
            : new FormArray([]);
    }

    getInformationalControls() {
        return this.dataForm.get('informational_files') ?
            (this.dataForm.get('informational_files') as FormArray).controls
            : new FormArray([]);
    }

    getInformationalLinks() {
        return this.dataForm.get('informational_links') ?
            (this.dataForm.get('informational_links') as FormArray).controls
            : new FormArray([]);
    }

    getControlsInformationalModels(index) {
        return (this.dataForm.get('informational_files') as FormArray).controls[index].get('informational_file_model') ? ((this.dataForm.get('informational_files') as FormArray).controls[index].get('informational_file_model') as FormArray).controls
            : new FormArray([]);
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

    onChangeServiceType() {
        this.hasApprove = false;
        this.serviceTypeAllowedOpeningType = true;
        this.serviceTypeAllowedOpening = true;
        this.serviceTypeMerelyInformative = false;
        for (let i = 0; i < this.serviceTicketTypes.length; i++) {
            if (this.serviceTicketTypes[i].id == this.dataForm.get('service_type_id').value) {
                if (this.serviceTicketTypes[i]?.merely_informative) {
                    this.serviceTypeMerelyInformative = true;
                    this.default_opening_text = this.serviceTicketTypes[i].default_opening_text.replace(/<[^>]*>/g, '');
                    break;
                }

                this.hasApprove = this.serviceTicketTypes[i].approval;
                if (this.serviceTicketTypes[i].max_hours_answer === 0) {
                    this.dataForm.get('max_hours_answer').setValue(null);
                }
                else {
                    this.dataForm.get('max_hours_answer').setValue(this.serviceTicketTypes[i].max_hours_answer);
                }
                this.initialDate = this.serviceTicketTypes[i].starting_day_for_opening == '0' ? moment().startOf('month').format() : moment().date(this.serviceTicketTypes[i].starting_day_for_opening).format();
                this.finalDate = this.serviceTicketTypes[i].final_day_for_opening == '0' ? moment().endOf('month').format() : moment().date(this.serviceTicketTypes[i].final_day_for_opening).format();

                if (moment().isSameOrAfter(this.initialDate, 'day') && moment().isSameOrBefore(this.finalDate, 'day')) {
                    this.serviceTypeAllowedOpening = true;
                } else {
                    this.serviceTypeAllowedOpening = false;
                }
                if (this.serviceTypeAllowedOpeningType && (this.serviceTicketTypes[i].use_approval || this.hasApprove) && (this.serviceTicketTypes[i].deadline_opening_after_repproval > 0 || this.serviceTicketTypes[i].deadline_opening_after_approval > 0)) {
                    if (this.serviceTicketTypes[i]?.prevision_opening_date?.prevision_opening_date_after_approval_repproval && moment().isBefore(this.serviceTicketTypes[i].prevision_opening_date.prevision_opening_date_after_approval_repproval)) {
                        this.serviceTypeAllowedOpening = false;
                        this.serviceTypeAllowedOpeningType = false;
                        this.initialDate = this.serviceTicketTypes[i].prevision_opening_date.prevision_opening_date_after_approval_repproval;
                        this.finalDate = null;
                    } else {
                        if (this.serviceTypeAllowedOpeningType && this.serviceTicketTypes[i]?.last_ticket_by_requester && this.serviceTicketTypes[i]?.last_ticket_by_requester.id_tipo_atendimento == this.dataForm.get('service_type_id').value) {
                            this.serviceTypeAllowedOpening = false;
                            this.serviceTypeAllowedOpeningType = false;
                            this.initialDate = null;
                            this.finalDate = null;
                        }
                    }
                }
            }
        }
    }

    canSave(): boolean {
        //TODO: Verificar para não requerer os arquivos
        return true;
    }

    openUrl(url: string): void {
        window.open(url, '_blank');
    }

    loadServiceType(event, type) {
        this.dataForm.get('service_type_id').setValue(null);
        this.dataForm.get('service_ticket_category_id').setValue(null);
        this.dataForm.get('description').setValue('', { onlySelf: true, emitEvent: false })
        this.type = type;
        if (event.source._checked) {
            this._serviceTicketAdminTypes.getAll(true, true, type == 'A' ? false : true).subscribe(result => {
                if (this.isRefundable) {
                    this.serviceTicketTypes = result.service_types.filter(type => type.service_ticket_type === 'RE')
                } else {
                    if (type === 'A') {
                        this.serviceTicketTypes = result.service_types.filter(type => type.service_ticket_type !== 'RE' && (!type.service_ticket_audience || (type.service_ticket_audience === 'A' || type.service_ticket_audience === 'AA')))
                    } else {
                        this.serviceTicketTypes = result.service_types.filter(type => type.service_ticket_type !== 'RE' && (!type.service_ticket_audience || (type.service_ticket_audience === 'A' || type.service_ticket_audience === 'C')))
                    }
                }

                if (this.serviceTicketCategories && this.serviceTicketCategories.length > 0) {
                    this.filteredServiceTicketTypes = [];
                } else {
                    this.filteredServiceTicketTypes = this.serviceTicketTypes
                }

            }, (error: any) => {
                if (error.status == 401) {
                    sessionStorage.setItem('cruzzyapp_auth-token', '');
                    window.location.href = '/auth/login';
                } else {
                    this._snackBar.open(this._translateService.instant('msg_erroPadrao'), 'X', { duration: 60000, panelClass: 'error-snackbar' });
                }
            });
        }
    }
}
