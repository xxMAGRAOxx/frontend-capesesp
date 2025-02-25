import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { IDynamicDialogTextArea } from 'app/types/dynamicDialog';

@Component({
  selector: 'dialog-cruzzy-text-area',
  templateUrl: './cruzzy-text-area.component.html',
  styleUrls: ['./cruzzy-text-area.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CruzzyTextAreaComponent implements OnInit, OnChanges {
  @Input() cruzzyForm: FormGroup;
  @Input() data: IDynamicDialogTextArea;

  @ViewChild('textArea') textArea: ElementRef;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof changes.data.currentValue?.focus === 'function') {
      if (changes.data.currentValue?.focus()) {
        this.focusTextArea();
      }
    }
  }

  ngOnInit(): void {
  }

  focusTextArea() {
    setTimeout(() => {
      this.textArea.nativeElement?.focus();
      this.textArea.nativeElement?.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Escape' }));
    }, 500);
  }
}
