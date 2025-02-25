import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { FuseUtils } from '@fuse/utils';
import { TranslateService } from '@ngx-translate/core';
import { ColDef, ColumnApi, ExcelStyle, GridApi, GridOptions, SideBarDef } from 'ag-grid-community';
import { MatSlideToggleComponent } from 'app/components/slide-toggle/slide-toggle-material.component';
import { ServiceTicketsScreeningService } from 'app/main/admin/service-tickets-screening/service-tickets-screening.service';
import { IButton } from 'app/types/button.type';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ServiceTicketsAdminServices } from 'services/admin/service-tickets-admin.service';
import { ServiceTicketsTypesAdminServices } from 'services/admin/service-tickets-types-admin.service';
import { GeneralServices } from 'services/general.service';
import { GridUtils } from 'utils/gridutils';
import { ValidatorUtils } from 'utils/validatorutils';

@Component({
    selector: 'transfer-ticket-dialog',
    templateUrl: './transfer-ticket-dialog.component.html',
    styleUrls: ['./transfer-ticket-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TransferTicketDialogComponent implements OnInit {

    // Botões
    buttonsFilter: IButton[];
    isExpanded: boolean = true;
    users: any[];

    dataForm: FormGroup;
    screeningDataForm: FormGroup;
    usersTransfer: any;
    groupsTransfer: any;
    isReclassify: boolean;
    isQueue: boolean;
    isScreening: boolean;
    isChangeRequesting: boolean;
    showCategories: boolean;
    categories: any[];
    types: any[];
    filteredTypes: any[];

    // Configuração do grid
    gridUtils: GridUtils;
    gridApi: GridApi;
    gridColumnApi: ColumnApi;
    autoGroupColumnDef: ColDef;
    gridDefs: GridOptions;
    sideBarDefs: SideBarDef | string | boolean | null;
    defaultColDefs: ColDef;
    contextMenuDefs: string[];
    gridActualPage: number = 0;
    columnDefs: ColDef[];
    columnDefsUser: ColDef[];
    columnDefsEmployee: ColDef[];
    columnTypesDefs: string[];
    firstGridLoad: boolean = true;
    excelStyles: ExcelStyle[] = [];
    groupDisplayType: 'singleColumn' | 'multipleColumns' | 'groupRows' | 'custom';
    localGridState: any;
    localGoupGridState: any;
    localFilterGridState: any;
    defaultGroupSortComparator: any;
    rowSelection: 'single' | 'multiple';
    frameworkComponents: any
    getRowNodeId: any;

    // Registros a serem exibidos no grid
    allRecords: Array<any>;
    filteredRecords: Array<any>;

    // Campo para pesquisa na listagem
    searchField: FormControl;

    // Estado do grid
    gridStateVarName: string = 'cruzzyapp_grid-state_transfer-ticket-table';
    gridGroupStateVarName: string = 'cruzzyapp_grid-groupstate_transfer-ticket-table';

    // Título da listagem/formulário
    mainTitle: string = '';

    isEnabledForMe = false;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<TransferTicketDialogComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<TransferTicketDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _validatorUtils: ValidatorUtils,
        private _serviceTicketAdminTypes: ServiceTicketsTypesAdminServices,
        private _fuseProgressBarService: FuseProgressBarService,
        private _serviceTicketAdminServices: ServiceTicketsAdminServices,
        private _snackBar: MatSnackBar,
        private _translateService: TranslateService,
        public _generalServices: GeneralServices,
        private _serviceTicketsScreeningService: ServiceTicketsScreeningService,
    ) {
        // Define as configurações gerais do grid
        // Set the defaults
        this.searchField = new FormControl('');
        this.gridUtils = new GridUtils(this._generalServices, this._translateService);
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        // Titulo da listagem
        this.mainTitle = this._translateService.instant('aba_configuracaoCampos');

        // Define as configurações gerais do grid
        this.autoGroupColumnDef = this.gridUtils.autoGroupColumnDef;
        this.gridDefs = this.gridUtils.gridDefs;
        this.sideBarDefs = false;
        this.defaultColDefs = this.gridUtils.defaultColDefs;
        this.contextMenuDefs = this.gridUtils.contextMenuDefs;
        this.columnTypesDefs = this.gridUtils.columnTypesDefs;
        this.excelStyles = this.gridUtils.excelStyles;
        this.gridDefs.rowGroupPanelShow = 'never';
        this.gridDefs.pagination = false;
        this.sideBarDefs = false;
        this.rowSelection = 'single';

        this.frameworkComponents = {
            matSlideToggleComponent: MatSlideToggleComponent
        };

        // Define a ordenação padrão de grupo
        this.defaultGroupSortComparator = function (nodeA, nodeB): number {
            if (nodeA.key < nodeB.key) {
                return -1;
            } else if (nodeA.key > nodeB.key) {
                return 1;
            } else {
                return 0;
            }
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.isReclassify = false;
        if (_data[0].isReclassify) {
            this.isReclassify = true;
        }
        this.isQueue = _data[0]?.isQueue;
        this.isScreening = _data[0]?.isScreening;
        this.isChangeRequesting = _data[0]?.isChangeRequesting;
    }

    ngOnInit(): void {
        // Configura o campo de pesquisa
        this.searchField.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this.filterRecords(searchText);
            });

        this.dataForm = this.openForm();
        let requesting_type_param = null;
        if (!this._data[0]?.requestingIsEmployee) {
            requesting_type_param = 'user';
        } else {
            requesting_type_param = 'employee';
        }
        if (this.isReclassify) {
            this._serviceTicketAdminServices.getCategories(null, requesting_type_param, this._data[0].requestingID).subscribe((val) => {
                this.categories = val.service_ticket_categories;

                if (this.categories.length > 0) {
                    this.categories.push({
                        active: true,
                        companies: [],
                        companies_id: [],
                        companies_names: "",
                        description: this._translateService.instant('hint_naoCategorizavel'),
                        id: 0,
                        name: this._translateService.instant('lbl_naoCategorizavel'),
                        service_types: []
                    });
                    this.showCategories = true;
                } else {
                    this.showCategories = false;
                }
            });
            this._serviceTicketAdminServices.getTypesToReclassify(this._data[0].idTicket, requesting_type_param, this._data[0].requestingID).subscribe(result => {
                this.types = result.service_types

                if (this.categories && this.categories.length > 0) {
                    this.filteredTypes = [];
                } else {
                    this.filteredTypes = this.types
                }
            }, (error: any) => {
                if (error.status == 401) {
                    sessionStorage.setItem('cruzzyapp_auth-token', '');
                    window.location.href = '/auth/login';
                } else {
                    this._snackBar.open(this._translateService.instant('msg_erroPadrao'), 'X', { duration: 60000, panelClass: 'error-snackbar' });
                }
            });
        } else if (!this.isReclassify && !this.isScreening && !this.isChangeRequesting) {
            this._serviceTicketAdminServices.getUsersToTransfer(this._data[0].idTicket).subscribe(result => {
                let filteredUsers = [];
                filteredUsers = result.users.filter((item) => item.id !== this._data[0].currentUserId && item.id !== this._data[0].requestingID);

                this.usersTransfer = filteredUsers;
            }, (error: any) => {
                if (error.status == 401) {
                    sessionStorage.setItem('cruzzyapp_auth-token', '');
                    window.location.href = '/auth/login';
                } else {
                    this._snackBar.open(this._translateService.instant('msg_erroPadrao'), 'X', { duration: 60000, panelClass: 'error-snackbar' });
                }
            });
        }

        if (this.isScreening || this.isChangeRequesting) {
            this.columnDefsUser = [
                {
                    headerName: this._translateService.instant('lbl_selecionado'),
                    field: 'included',
                    type: 'slideToggleColumn',
                    cellRenderer: "matSlideToggleComponent",
                    valueFormatter: this.gridUtils.slideToggleFormatter,
                    cellStyle: { pointerEvents: 'auto' },
                    width: 160
                },
                {
                    headerName: this._translateService.instant('lbl_nome'),
                    field: 'name',
                    type: 'mediumTextColumn',
                    sort: 'asc',
                },
                {
                    headerName: this._translateService.instant('lbl_email'),
                    field: 'email',
                    type: 'mediumTextColumn',
                },
            ];

            this.columnDefsEmployee = [
                {
                    headerName: this._translateService.instant('lbl_selecionado'),
                    field: 'included',
                    type: 'slideToggleColumn',
                    cellRenderer: "matSlideToggleComponent",
                    valueFormatter: this.gridUtils.slideToggleFormatter,
                    cellStyle: { pointerEvents: 'auto' },
                    width: 160
                },
                {
                    headerName: this._translateService.instant('lbl_cdFuncionario'),
                    field: 'badge',
                    type: 'smallTextColumn'
                },
                {
                    headerName: this._translateService.instant('lbl_nmFuncionario'),
                    field: 'name',
                    type: 'largeTextColumn',
                    sort: 'asc',
                },
                {
                    headerName: this._translateService.instant('lbl_nmSocial'),
                    field: 'social_name',
                    type: 'mediumTextColumn',
                },
                {
                    headerName: this._translateService.instant('lbl_nrCpf'),
                    field: 'vat',
                    type: 'smallTextColumn',
                    valueFormatter: this.gridUtils.vatFormatter
                },
                {
                    headerName: this._translateService.instant('lbl_email'),
                    field: 'email',
                    type: 'largeTextColumn',
                },
                {
                    headerName: this._translateService.instant('lbl_emailPessoal'),
                    field: 'personal_email',
                    type: 'largeTextColumn',
                },
                {
                    headerName: this._translateService.instant('lbl_nmEmpresa'),
                    field: 'company_name',
                    type: 'largeOptionColumn',
                },
                // {
                //     headerName: this._translateService.instant('lbl_cdCargo'),
                //     field: 'position_code',
                //     type: 'smallTextColumn',
                //     hide: true
                // },
                // {
                //     headerName: this._translateService.instant('lbl_nmCargo'),
                //     field: 'position_name',
                //     type: 'mediumOptionColumn',
                //     enableRowGroup: true
                // },
                // {
                //     headerName: this._translateService.instant('lbl_cdFuncao'),
                //     field: 'occupation_code',
                //     type: 'smallTextColumn',
                //     hide: true
                // },
                // {
                //     headerName: this._translateService.instant('lbl_nmFuncao'),
                //     field: 'occupation_name',
                //     type: 'mediumOptionColumn',
                //     hide: true,
                // },
                // {
                //     headerName: this._translateService.instant('lbl_cdUnidade'),
                //     field: 'organizational_unit_code',
                //     type: 'smallTextColumn',
                //     hide: true
                // },
                // {
                //     headerName: this._translateService.instant('lbl_nmUnidade'),
                //     field: 'organizational_unit_name',
                //     type: 'mediumOptionColumn',
                //     hide: true,
                //     enableRowGroup: true
                // },
                {
                    headerName: this._translateService.instant('lbl_dataAdmissao'),
                    field: 'admission_date',
                    type: 'longDateColumn',
                    hide: true,
                    valueFormatter: this.gridUtils.dateFormatter,
                    filter: 'agDateColumnFilter',
                },
                {
                    headerName: this._translateService.instant('lbl_dataDesligamento'),
                    field: 'resignation_date',
                    type: 'longDateColumn',
                    hide: true,
                    valueFormatter: this.gridUtils.dateFormatter,
                    filter: 'agDateColumnFilter',
                },
                {
                    headerName: this._translateService.instant('lbl_dataNascimento'),
                    field: 'birthday_date',
                    type: 'shortDateColumn',
                    sort: 'asc',
                    hide: true,
                    valueFormatter: this.gridUtils.dateFormatter
                },
                {
                    headerName: this._translateService.instant('lbl_situacaoFolha'),
                    field: 'status_in_payroll_mnemonic',
                    type: 'smallOptionColumn',
                    valueFormatter: this.gridUtils.translatedFormatter,
                    enableRowGroup: true
                },
                // {
                //     headerName: this._translateService.instant('lbl_nmCracha'),
                //     field: 'badge_name',
                //     type: 'mediumTextColumn',
                //     hide: true,
                // },
            ];

            // Definição das colunas do grid
            this.columnDefs = this.columnDefsEmployee;

            this.buttonsFilter = [{
                mnemonic: 'lbl_pesquisar',
                action: () => this.applyFilter(),
                icon: 'search',
                className: 'custom-mini-fab-button ml-10',
                matIconClassName: 'mr-0',
                color: 'accent',
                moreVert: false,
                visible: () => true,
                disabled: () => this.screeningDataForm.controls.type.invalid
            },
            {
                mnemonic: 'btn_limpar',
                action: () => this.clearFilter(),
                icon: 'clear',
                className: 'custom-mini-fab-button ml-10',
                matIconClassName: 'mr-0',
                color: '',
                moreVert: false,
                visible: () => true,
                disabled: () => { },
            }];

            this.users = [
                {
                    id: 1,
                    name: 'Administrador',
                    key: 'user',
                },
                {
                    id: 2,
                    name: 'Colaborador',
                    key: 'employee',
                }
            ];

            this.allRecords = [];
            this.filteredRecords = this.allRecords;
        }
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
        let isrequired = this.isScreening || this.isChangeRequesting ? true : false;
        let form = this._formBuilder.group({
            employee_id: new FormControl(null, this._validatorUtils.requiredIf(() => isrequired)),
            service_ticket_type_id: new FormControl(null, this._validatorUtils.requiredIf(() => this.isReclassify)),
            service_ticket_category_id: new FormControl(null, this._validatorUtils.requiredIf(() => this.isReclassify && this.categories?.length > 0)),
            mantain_responsible: new FormControl(false)
        });

        form.controls.service_ticket_category_id.valueChanges.subscribe((val) => {
            if (val) {
                let category = this.categories.find((cat) => cat.id === val);
                this.filteredTypes = this.types.filter((type) => category.service_types.indexOf(type.id) > -1);
            } else {
                if (val === 0) {
                    this.filteredTypes = this.types.filter((type) => !type.service_ticket_category_id)
                } else {
                    this.filteredTypes = []
                }
            }
            this.dataForm.get('service_ticket_type_id').setValue(null)
        });

        form.controls.service_ticket_type_id.valueChanges.subscribe((val) => {
            if (val) {
                let currentType = this.types.filter((type) => type.id == val);
                console.log(currentType);
                this.isEnabledForMe = currentType[0].enabled_for_me;
            }
        });

        this.screeningDataForm = this._formBuilder.group({
            type: new FormControl('employee', Validators.required),
            search: new FormControl(null),
            employee_id: new FormControl(null, Validators.required),
        });
        return form
    }


    detailRecord() { }

    /**
     * retorna a confirmacao da transferencia passando o employee_id
     */
    transferTicket(): void {
        this._fuseProgressBarService.show();
        this.matDialogRef.close(['yes', this.dataForm.get('employee_id').value, this.dataForm.value, this.screeningDataForm.value]);
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

    onCellValueChanged(event) {
        if (event.data.included) {
            this.screeningDataForm.controls.employee_id.setValue(event.data.id);
            this.gridApi.forEachNode((node) => {
                if (node.data.id != event.data.id) {
                    node.data.included = false;
                }
            });

            this.gridApi.redrawRows();
        }
    }

    cellClicked(event) {
        if (event.colDef.field == "included") {
            return;
        }
        event.data.included = true;
        this.onCellValueChanged(event);
    }

    /**
     * Aplica os filtros
     */
    applyFilter() {
        // reset column order
        this.gridApi.setColumnDefs([]);

        if (this.screeningDataForm.controls.type.value === 'employee') {
            this.gridApi.setColumnDefs(this.columnDefsEmployee);

        } else {
            this.gridApi.setColumnDefs(this.columnDefsUser);
        }
        this._serviceTicketsScreeningService.getUsers(this.screeningDataForm.value).then((result) => {
            this.allRecords = result.requesters;
            this.filteredRecords = this.allRecords;
        });
    }

    /**
     * Limpa os filtros
     */
    clearFilter() {
        this.allRecords = [];
        this.filteredRecords = this.allRecords;
        this.screeningDataForm.controls.search.setValue(null);
    }

    /**
     * Define menu de contexto do grid
     * 
     * @param params 
     * @returns 
     */
    getContextMenuItems = (params) => this.gridUtils.customContextMenu(params, this.mainTitle, null, this);

    /**
     * Salva o estado do grid no localstorage
     */
    saveGridState() {
        if (this.gridColumnApi) {
            localStorage.setItem(this.gridStateVarName, JSON.stringify(this.gridColumnApi.getColumnState()));
            localStorage.setItem(this.gridGroupStateVarName, JSON.stringify(this.gridColumnApi.getColumnGroupState()));
        }
    }

    /**
     * Remove o estado do grid no localstorage
     */
    deleteGridState() {
        localStorage.removeItem(this.gridStateVarName);
        localStorage.removeItem(this.gridGroupStateVarName);
    }

    /**
     * Mudança na paginação do grid
     */
    onPaginationChanged() {
        if (this.gridApi) {
            if (this.gridApi.paginationGetCurrentPage() !== undefined) {
                this.gridActualPage = this.gridApi.paginationGetCurrentPage();
                this.saveLocalGridState();
            }
        }
    }

    /**
     * Salva estado do grid e paginação
     */
    saveLocalGridState() {
        if (this.gridColumnApi) {
            this.localGridState = this.gridColumnApi.getColumnState();
            this.localGoupGridState = this.gridColumnApi.getColumnGroupState();
        }
        if (this.gridApi) {
            this.localFilterGridState = this.gridApi.getFilterModel();
        }
    }

    /**
     * Carrega o estado do grid do localstorage
     */
    loadGridState() {
        if (localStorage.getItem(this.gridStateVarName)) {
            this.gridColumnApi.applyColumnState({
                state: JSON.parse(localStorage.getItem(this.gridStateVarName)),
                applyOrder: true,
            });
        }
        if (localStorage.getItem(this.gridGroupStateVarName)) {
            this.gridColumnApi.setColumnGroupState(JSON.parse(localStorage.getItem(this.gridGroupStateVarName)));
        }
    }

    /**
     * Carrega o estado do grid e paginação
     */
    loadLocalGridState() {
        if (this.localGridState) {
            this.gridColumnApi.applyColumnState({
                state: this.localGridState,
                applyOrder: true,
            });
        }
        if (this.localGoupGridState) {
            this.gridColumnApi.setColumnGroupState(this.localGoupGridState);
        }
        this.gridApi.paginationGoToPage(this.gridActualPage);
        if (this.localFilterGridState) {
            this.gridApi.setFilterModel(this.localFilterGridState);
        }
    }

    /**
     * Grid finalizado
     * 
     * @param params 
     */
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.gridApi.setPopupParent(document.querySelector('body'));

        if (this.firstGridLoad) {
            this.firstGridLoad = false;
            this.loadGridState();
        } else {
            this.loadLocalGridState();
        }
    }

    /**
     * Aplica filto padrão
     * 
     * @param params 
     */
    onFirstDataRendered(params) {
        setTimeout(() => {
            this.gridApi.onFilterChanged();
        }, 300);
    }

    /**
     * Filtra os dados no grid pelo texto digitado
     * 
     * @param searchText Texto a pesquisar
     */
    filterRecords(searchText) {
        this.filteredRecords = FuseUtils.filterArrayByString(this.allRecords, searchText);
    }
}
