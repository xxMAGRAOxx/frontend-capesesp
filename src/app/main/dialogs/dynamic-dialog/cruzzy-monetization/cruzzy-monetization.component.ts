import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { IDynamicDialogMonetization } from 'app/types/dynamicDialog';
import { GeneralServices } from 'services/general.service';

@Component({
  selector: 'dialog-cruzzy-monetization',
  templateUrl: './cruzzy-monetization.component.html',
  styleUrls: ['./cruzzy-monetization.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CruzzyMonetizationComponent implements OnInit {

  @Input() data: IDynamicDialogMonetization;
  @Input() cruzzyForm: FormGroup;

  decimalPoint = ',';
  thousandsSeparator = '.';

  constructor(
    private _generalServices: GeneralServices
  ) {
    this.decimalPoint = this._generalServices.decimalPoint;
    this.thousandsSeparator = this._generalServices.thousandsSeparator;
  }

  ngOnInit(): void {
  }

}
