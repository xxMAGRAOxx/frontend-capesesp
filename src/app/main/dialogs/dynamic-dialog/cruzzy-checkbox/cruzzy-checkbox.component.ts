import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { IDynamicDialogCheckbox } from 'app/types/dynamicDialog';

@Component({
  selector: 'dialog-cruzzy-checkbox',
  templateUrl: './cruzzy-checkbox.component.html',
  styleUrls: ['./cruzzy-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CruzzyCheckboxComponent implements OnInit {
  @Input() cruzzyForm: FormGroup;
  @Input() data: IDynamicDialogCheckbox;

  constructor() { }

  ngOnInit(): void {
  }

}
