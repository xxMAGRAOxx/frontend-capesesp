import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicDialogFile } from 'app/types/dynamicDialog';

@Component({
  selector: 'dialog-cruzzy-file',
  templateUrl: './cruzzy-file.component.html',
  styleUrls: ['./cruzzy-file.component.scss']
})
export class CruzzyFileComponent implements OnInit {
  @Input() cruzzyForm: FormGroup;
  @Input() data: IDynamicDialogFile;
  formData: FormData;
  fileToUpload?: File;
  
  constructor() { }

  ngOnInit(): void {
  }

  fileChange(event) {
    this.formData.append('file', event.target.files[0]);
  }
}
