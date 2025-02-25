import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicDialogHtmlEditor } from 'app/types/dynamicDialog';

@Component({
  selector: 'dialog-cruzzy-html-editor',
  templateUrl: './cruzzy-html-editor.component.html',
  styleUrls: ['./cruzzy-html-editor.component.scss']
})
export class CruzzyHtmlEditorComponent implements OnInit {
  @Input() cruzzyForm: FormGroup;
  @Input() data: IDynamicDialogHtmlEditor;

  constructor() { }

  ngOnInit(): void {
  }

}
