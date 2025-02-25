import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { IDynamicDialogInputItems } from 'app/types/dynamicDialog';
import { GeneralServices } from 'services/general.service';

@Component({
  selector: 'dialog-cruzzy-input',
  templateUrl: './cruzzy-input.component.html',
  styleUrls: ['./cruzzy-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CruzzyInputComponent implements OnInit, OnChanges {
  @Input() cruzzyForm: FormGroup;
  @Input() data: IDynamicDialogInputItems;
  @ViewChild('input') input: ElementRef;

  decimalPoint = ',';
  thousandsSeparator = '.';

  constructor(
    private _generalServices: GeneralServices
  ) {
    this.decimalPoint = this._generalServices.decimalPoint;
    this.thousandsSeparator = this._generalServices.thousandsSeparator;
  }

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
      this.input.nativeElement?.focus();
      this.input.nativeElement?.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Escape' }));
    }, 500);
  }

}
