import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { IDynamicDialogSlidetoggleItems } from 'app/types/dynamicDialog';

@Component({
    selector: 'dialog-cruzzy-slide-toggle',
    templateUrl: './cruzzy-slide-toggle.component.html',
    styleUrls: ['./cruzzy-slide-toggle.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CruzzySlideToggleComponent implements OnInit {
    @Input() cruzzyForm: FormGroup;
    @Input() data: IDynamicDialogSlidetoggleItems;

    constructor() { }

    ngOnInit(): void {
    }

}
