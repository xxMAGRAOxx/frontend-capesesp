import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseNavigation } from '@fuse/types';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'app/model/User';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';
import { environment } from '../environments/environment';
// import { LanguageService } from './language.service';

import { ViewErrorDialogComponent } from 'app/main/dialogs/error/error.component';

declare function jivoUser(user, name, email): any;

@Injectable({
    providedIn: 'root',
})

export class GeneralServices {
    appVersion = environment.version;
    appStage = environment.api_url == 'servicosn.capesesp.com.br' ? 'production' : 'development';

    jwtTokenData = null;

    private _onUserChanged: BehaviorSubject<any>;
    private _onProcessChanged: BehaviorSubject<any>;
    private _onLanguageChanged: BehaviorSubject<any>;
    private _onCompanyComponentChanged: BehaviorSubject<any>;
    private _onCompanyChanged: BehaviorSubject<any>;
    private _onCustomThemeGetted: BehaviorSubject<any>;

    // Endereço do servidor dos webservices
    API_URL = environment.api_url;

    serverSide;
    // Dados do usuário logado
    user: User;
    navigation: FuseNavigation[];

    // Constantes de linguagem
    dateFormat = 'DD/MM/YYYY';
    shortDateFormat = 'MMM/YYYY';
    dateTimeFormat = 'DD/MM/YYYY HH:mm:ss'
    dateWithoutSecondsFormat = 'DD/MM/YYYY HH:mm'
    language = 'pt-BR';
    currencySymbol = 'R$';
    decimalPoint = ',';
    thousandsSeparator = '.';

    companiesComponent: any[] = [];
    companies: any[] = [];
    globalProcessing: number = 0;
    globalProcessData: any[] = [];

    // dialogRef: MatDialogRef<any>;

    profileImage = '/assets/images/avatars/profile.jpg';
    petImage = '/assets/images/avatars/pet-profile.png';
    vehicleImage = '/assets/images/avatars/car-profile.png';
    companyImage = '/assets/images/avatars/company.jpg'

    colorDomains = ['#277DA1', '#F3722C', '#577590', '#F8961E', '#4D908E', '#F9844A', '#43AA8B', '#F9C74F', '#90BE6D', '#EFCBDA', '#359FD1', '#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107', '#25c625', '#232ca1', '#2cd0c6', '#302834', '#B2B3AA', '#F94144', '#EFCBDA', '#359FD1', '#4D908E', '#F9844A', '#43AA8B', '#F9C74F', '#90BE6D', '#EFCBDA', '#359FD1', '#f44336', '#9c27b0', '#03a9f4',
        '#276DA1', '#F3622C', '#566590', '#F8561E', '#4D108E', '#F9644A', '#93AA8B', '#F4C64F', '#90BE3D', '#EFCBDA', '#359FD1', '#f44336', '#9c26b0', '#03a9f4', '#e51e63', '#ffc106', '#25c625', '#236ca1', '#2cd0c6', '#302234', '#B2B3AA', '#F94144', '#EFCBDA', '#359FD1', '#4D908E', '#F9844A', '#43AA8B', '#F9C64F', '#90BE6D', '#EFCBDA', '#359FD1', '#f44336', '#9c26b0', '#03a9f4'];


    paycheckViewEnabled = false;

    constructor(
        private _httpClient: HttpClient,
        private _translateService: TranslateService,
        private _dateAdapter: DateAdapter<any>,
        private _router: Router,
        // private _languageService: LanguageService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseNavigationService: FuseNavigationService,
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder,
    ) {
        this._onUserChanged = new BehaviorSubject(null);
        this._onLanguageChanged = new BehaviorSubject(null);
        this._onCompanyComponentChanged = new BehaviorSubject(null);
        this._onCompanyChanged = new BehaviorSubject(null);
        this._onProcessChanged = new BehaviorSubject(null);
        this._onCustomThemeGetted = new BehaviorSubject(null);

        this.user = {
            type: '',
            id: 0,
            name: '',
            first_name: '',
            email: '',
            language: this.language,
            currency: this.currencySymbol,
            customer_id: 0,
            partner_id: 0,
            customer_name: '',
            customer_trade_name: '',
            image_url: '',
            admission_document_settings: [],
            service_ticket_refund_settings: [],
            points: 0,
            company_image_url: '',
            customer_image_url: '',
            enrollment_period: [],
            company_name: '',
            position_name: '',
            organizational_unit_name: '',
            badge: '',
            vat: '',
            salary: '',
            applicant: false,
            custom_fields: null,
            salary_field_access: false,
            url_platform_term: '',
            title: '',
            has_benefits_changes: false,
            opening_service_tickets_by_email: false,
            disregard_unidentified_emails: false,
            message_email_queue: '',
            message_email_screening: '',
            message_email_ignored: '',
            url_platform: '',

            benefits_modality: '',

            refundable_balance: 0,

            related_employee_id: null,

            use_table_accounts_by_relative_dirf: false,

            customize_stone: false,

            menus: [],
            translation_replacements: [],
            custom_theme: [],

            has_integration: false,
            basic: false,

            eletronic_signature_module: false,
            eletronic_signature_module_data: [],

            customer_parameters: {
                use_checking_account: false,
                customer_hr_software: '',
                flexible_benefits_module: false,
                fixed_benefits_module: false,
                allow_editing_package: false,
                admission_module: false,
                helpdesk_module: false,
                refundable_module: false,
                offboarding_module: false,
                eletronic_signature_module: false,
                use_base_points: false,
                use_bonus_points: false,
                show_discount_value_enrollment_card: false,
                allow_pet_maintenance: false,
                allow_managers_access_employees_data: false,
                show_all_hierarchy: false,
                assist_module: false,
                display_remuneration_chart_to_employee: false,
                external_authentication_only: false
            },

            show_positive_occurence: false,
            signature_link: null
        };

        // Menus
        this.navigation = [];
    }

    /**
     * Chama o serviço de autenticação do usuário
     * 
     * @param email E-mail do usuário
     * @param password  Senha
     * @param trustedDevice  uiid do dispositivo salvo como confiavel
     * @returns 
     */
    authenticate(data): Observable<any> {
        let passmd5 = Md5.hashStr(data.password);
        return this._httpClient.post<any>(this.API_URL + 'auth/' + data.trustedDevice + '/' + data.company,
            {
                'user': data.email,
                'password': passmd5,
                'user_type': data.type,
            },
            this.getHeaders());
    }

    getAPIUrl() {
        return this.API_URL;
    }

    getHeaders(contentType?): any {
        let token = sessionStorage.getItem('cruzzyapp_auth-token');
        let headers;
        if (contentType) {
            headers = {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + token
                }),
            };
        } else {
            headers = {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }),
            };
        }

        return headers;
    }

}





