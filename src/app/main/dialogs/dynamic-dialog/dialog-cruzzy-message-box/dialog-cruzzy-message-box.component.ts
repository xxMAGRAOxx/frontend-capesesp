import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicDialogMessageBoxItems } from 'app/types/dynamicDialog';

@Component({
  selector: 'dialog-cruzzy-message-box',
  templateUrl: './dialog-cruzzy-message-box.component.html',
  styleUrls: ['./dialog-cruzzy-message-box.component.scss']
})
export class CruzzyMessageBoxComponent implements OnInit {
  @Input() cruzzyForm: FormGroup;
  @Input() data: IDynamicDialogMessageBoxItems;

  constructor() { }

  ngOnInit(): void {
  }

}
