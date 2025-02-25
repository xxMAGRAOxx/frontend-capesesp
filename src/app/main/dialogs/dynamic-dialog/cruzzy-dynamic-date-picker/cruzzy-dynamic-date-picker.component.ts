import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicDialogCruzzyPickerItems } from 'app/types/dynamicDialog';

@Component({
  selector: 'cruzzy-dynamic-date-picker',
  templateUrl: './cruzzy-dynamic-date-picker.component.html',
  styleUrls: ['./cruzzy-dynamic-date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CruzzyDynamicDatePickerComponent implements OnInit {
  @Input() cruzzyForm: FormGroup;
  @Input() data: IDynamicDialogCruzzyPickerItems;

  constructor() { }

  ngOnInit(): void {
  }

}
