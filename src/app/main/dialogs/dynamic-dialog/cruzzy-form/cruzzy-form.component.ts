import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicDialogForm } from 'app/types/dynamicDialog';

@Component({
  selector: 'dialog-cruzzy-form',
  templateUrl: './cruzzy-form.component.html',
  styleUrls: ['./cruzzy-form.component.scss']
})
export class CruzzyFormComponent implements OnInit {
  @Input() cruzzyForm: FormGroup;
  @Input() data: IDynamicDialogForm;

  constructor() { }

  ngOnInit(): void {
  }

}
