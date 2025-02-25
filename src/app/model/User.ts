
// Usuário lohado
export interface User {
    // Dados comuns
    type: string;
    id: number;
    name: string;
    first_name: string;
    email: string;
    language: string;
    currency: string;
    customer_id: number;
    partner_id: number;
    customer_name: string;
    customer_trade_name: string;
    image_url: string;
    customer_image_url: string;
    company_id?: number;
    refundable_balance: number;
    has_integration: boolean;
    status_in_payroll?: string;
    custom_fields: any[];
    title?: string;
    salary: string;

    admission_document_settings: any[]
    service_ticket_refund_settings: any[]

    // Employee
    points: number;
    company_image_url: string;
    enrollment_period: any;
    company_name: string;
    position_name: string;
    organizational_unit_name: string;
    badge: string;
    vat: string;
    url_platform_term: string;
    benefits_modality: string;

    eletronic_signature_module: boolean;
    eletronic_signature_module_data: any[];


    // Menus que podem ser exibidos para o usuário
    menus: any;
    // Traduções parametrizadas para o cliente
    translation_replacements: any;
    // Tema customizado
    custom_theme: any;
    applicant: boolean;

    use_table_accounts_by_relative_dirf: boolean;
    //board de eleição customizado
    customize_stone: boolean;

    // Parâmetros específicos do cliente
    customer_parameters: {
        use_checking_account: boolean;
        customer_hr_software: string;
        flexible_benefits_module: boolean;
        fixed_benefits_module: boolean;
        allow_editing_package: boolean;
        admission_module: boolean;
        helpdesk_module: boolean;
        refundable_module: boolean;
        offboarding_module: boolean;
        eletronic_signature_module: boolean;
        use_base_points: boolean;
        use_bonus_points: boolean;
        show_discount_value_enrollment_card: boolean;
        allow_pet_maintenance: boolean;
        allow_managers_access_employees_data: boolean;
        show_all_hierarchy: boolean;
        has_senior_integration?: boolean;
        has_sinergy_integration?: boolean;
        has_maisvt_integration?: boolean;
        has_starsoft_integration?: boolean;
        has_metadados_integration?: boolean;
        assist_module: boolean;
        display_remuneration_chart_to_employee: boolean;
        external_authentication_only: boolean;
    }
    //employee relacionado no cadastro de usuarios
    related_employee_id: number;
    applicant_admission_processes?: any;
    processes_documents_signatures?: any;

    calculate_topup_devolution_payroll_deductions?: boolean;
    calculate_topup_devolution_resignation_payroll_deductions?: boolean;

    // Permissões especiais
    salary_field_access: boolean;

    basic: boolean;
    has_benefits_changes: boolean;

    opening_service_tickets_by_email: boolean;
    disregard_unidentified_emails: boolean;
    message_email_queue: string;
    message_email_screening: string;
    message_email_ignored: string;

    url_platform: string;

    show_positive_occurence: boolean;
    signature_link: string;
}