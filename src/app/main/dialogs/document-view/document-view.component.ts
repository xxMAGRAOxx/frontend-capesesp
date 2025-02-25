import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { TranslateService } from '@ngx-translate/core';
import { admissionDocumentModelsType } from 'app/types/admission-document-models.type';
import { GeneralServices } from 'services/general.service';

@Component({
    selector: 'app-document-view',
    templateUrl: './document-view.component.html',
    styleUrls: ['./document-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DocumentViewComponent implements OnInit {
    @ViewChild('document_content') document_content: ElementRef;

    document: admissionDocumentModelsType;
    isAccepted = false;
    acceptForm: FormGroup;
    iframeHtml = '';

    constructor(
        public matDialogRef: MatDialogRef<DocumentViewComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _generalServices: GeneralServices,
        private _dialog: MatDialog,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _translateService: TranslateService
    ) {
        this.document = _data.document;
        this.isAccepted = _data.isAccepted;
    }

    ngOnInit(): void {
        this.iframeHtml = '<base href="/"><link href="https://fonts.googleapis.com/css?family=Muli:300,400,600,700" rel="stylesheet"><body style="font-family: Arial, Helvetica">' + this.document.text + ' </body>';
        this.acceptForm = this._formBuilder.group({
            accept: [false, [Validators.requiredTrue]],
        });
    }

    close(): void {
        this.matDialogRef.close([false]);
    }

    acceptDocument(): void {
        this.matDialogRef.close([true, this.document]);
    }

    print(): void{
        window.frames["printf"].focus();
        window.frames["printf"].print();
    }
}
