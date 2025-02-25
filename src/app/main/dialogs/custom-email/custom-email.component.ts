import { AfterViewInit, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { EmailModelsService } from 'app/main/admin/email-models/email-models.service';
import { GeneralServices } from 'services/general.service';

@Component({
    selector: 'app-custom-email',
    templateUrl: './custom-email.component.html',
    styleUrls: ['./custom-email.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CustomEmailComponent implements OnInit, AfterViewInit {

    emailTitleControl: string;
    emailbodyControl: string;
    emailModels: any[] = [];
    buttonConfirm: string = 'btn_enviar';
    buttonCancel: string = 'btn_cancelar';
    dataForm: FormGroup;

    defaultBody: string;

    constructor(
        public matDialogRef: MatDialogRef<CustomEmailComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private translate: TranslateService,
        private _formBuilder: FormBuilder,
        public _generalServices: GeneralServices,
        private _emailModelsService: EmailModelsService) {
        this.emailTitleControl = this._data.emailTitleControl;
        this.emailbodyControl = _data.emailbodyControl;
        this.dataForm = _data.dataForm;
        this.defaultBody = this.dataForm.get(this.emailbodyControl).value
        this.buttonConfirm = _data.buttonConfirm ? _data.buttonConfirm : this.buttonConfirm;
        this.buttonCancel = _data.buttonCancel ? _data.buttonCancel : this.buttonCancel;

        if (_data.emailModels) {
            this.emailModels = _data.emailModels
        }
    }

    ngOnInit() {
        // this.setEmailModel(this.defaultBody)
    }
    
    ngAfterViewInit() {
        this.setEmailModel(this.defaultBody)
    }

    setEmailModel(event) {
        let body: string = event ? event : this.defaultBody;
        this.dataForm.get(this.emailbodyControl).setValue(body);
        this._emailModelsService.getPreview(this.dataForm.value).then((val) => {
            body = val
            this.dataForm.get(this.emailbodyControl).setValue(body ? body : this.defaultBody, { emitEvent: false, onlySelf: true });
        })
    }

    confirm() {
        this.matDialogRef.close(['yes']);
    }

    cancel() {
        this.matDialogRef.close(['no']);
    }

}
