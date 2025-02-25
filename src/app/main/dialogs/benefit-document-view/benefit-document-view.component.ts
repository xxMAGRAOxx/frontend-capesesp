import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { TranslateService } from '@ngx-translate/core';
import { GeneralServices } from 'services/general.service';

@Component({
    selector: 'app-benefit-document-view',
    templateUrl: './benefit-document-view.component.html',
    styleUrls: ['./benefit-document-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BenefitDocumentViewComponent implements OnInit {
    @ViewChild('document_content') document_content: ElementRef;

    html: string[];
    isAccepted = false;
    document: any;
    acceptForm: FormGroup;
    iframeHtml = '';
    groupTerms: FormGroup;
    selectedIndex: number = 0;
    documentoHeight = 40;
    total = 0;
    innerHeight = 0;

    constructor(
        public matDialogRef: MatDialogRef<BenefitDocumentViewComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _generalServices: GeneralServices,
        private _dialog: MatDialog,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _translateService: TranslateService
    ) {
        this.groupTerms = this._formBuilder.group({
            terms: new FormArray([])
        })
        this.html = _data.html;
        this.document = _data.document;
        this.isAccepted = _data.isAccepted;
        if (this.html) {
            if (typeof (this.html) === 'string') {
                this.html = [this.html];
            }
            this.html.forEach((term, index) => {
                this.total++;
                (this.groupTerms.get('terms') as FormArray).push(this._formBuilder.group({
                    'html': new FormControl(term),
                    'accepted': new FormControl(this.isAccepted, [Validators.requiredTrue])
                }))
            })
        }
        if (this.total > 0) {
            this.total--;
        }
        this.fixHeight();        
    }

    getTerms() {
        return this.groupTerms.get('terms') ?
            (this.groupTerms.get('terms') as FormArray).controls
            : new FormArray([]);
    }

    fixHeight(){
        let original = window.innerHeight - 334;
        if (window.outerWidth <= 961) {
            original = window.innerHeight - 370;
        }
        this.documentoHeight = original - (this.total * 42);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        // this.fixHeight();
    }

    nextIndex(index) {
        if ((this.groupTerms.get('terms') as FormArray).controls.length - 1 > index) {
            this.selectedIndex = index + 1
        } else {
            this.acceptDocument()
        }
    }

    ngOnInit(): void {
    }

    getText(index) {

        let accepted = '';
        if (this.document && (this.isAccepted || (this.groupTerms.get('terms') as FormArray).controls[index].valid)) {
            accepted = '<p>' + this._translateService.instant('lbl_aceito') + ': ' + this.document.accepted_date + ' | IP: ' + this.document.ip + '</p>';
        }
        return this.iframeHtml = '<base href="/"><link href="https://fonts.googleapis.com/css?family=Muli:300,400,600,700" rel="stylesheet"><body style="font-family: Arial, Helvetica">' + this.html[index] + accepted + '</body>';
    }

    close(): void {
        this.matDialogRef.close([false]);
    }

    acceptDocument(): void {
        this.matDialogRef.close([true, this.html]);
    }

    print(index): void {
        let text = this.getText(index)
        let doc = window.open('about:blank');
        doc.document.write(text);
        doc.window.print();
        doc.window.close();
    }
}
