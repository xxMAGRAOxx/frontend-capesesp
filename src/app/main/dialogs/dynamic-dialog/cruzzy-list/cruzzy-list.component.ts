import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicDialogList } from 'app/types/dynamicDialog';

@Component({
  selector: 'dialog-cruzzy-list',
  templateUrl: './cruzzy-list.component.html',
  styleUrls: ['./cruzzy-list.component.scss']
})
export class CruzzyListComponent implements OnInit {
  @Input() cruzzyForm: FormGroup;
  @Input() data: IDynamicDialogList;

  constructor() { }

  ngOnInit(): void {
  }

}
