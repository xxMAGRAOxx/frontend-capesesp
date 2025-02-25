import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicDialogAccordion } from 'app/types/dynamicDialog';

@Component({
  selector: 'dialog-cruzzy-accordion',
  templateUrl: './cruzzy-accordion.component.html',
  styleUrls: ['./cruzzy-accordion.component.scss']
})
export class CruzzyAccordionComponent implements OnInit {

  @Input() cruzzyForm: FormGroup;
  @Input() data: IDynamicDialogAccordion;

  constructor() {
  }

  ngOnInit(): void {
  }

}
