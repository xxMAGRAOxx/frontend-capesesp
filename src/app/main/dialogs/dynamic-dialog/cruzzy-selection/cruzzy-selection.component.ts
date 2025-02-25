import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicDialogSelectItems } from 'app/types/dynamicDialog';

@Component({
  selector: 'dialog-cruzzy-selection',
  templateUrl: './cruzzy-selection.component.html',
  styleUrls: ['./cruzzy-selection.component.scss']
})
export class CruzzySelectionComponent implements OnInit, OnChanges {
  @Input() cruzzyForm: FormGroup;
  @Input() data: IDynamicDialogSelectItems;

  @ViewChild('select_focus') select_focus: ElementRef;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof changes.data.currentValue?.focus === 'function') {
      if (changes.data.currentValue?.focus()) {
        this.focusSelect();
      }
    }
  }

  ngOnInit(): void {
  }

  focusSelect() {
    setTimeout(() => {
      this.select_focus.nativeElement?.focus();
      this.select_focus.nativeElement?.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Escape' }));
    }, 500);
  }

}
