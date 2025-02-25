import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TreeviewItem } from 'app/components/treeview/models/treeview-item';
import { IDynamicDialogTreeView } from 'app/types/dynamicDialog';
import { TreeViewUtils } from 'utils/treeviewutils';

@Component({
  selector: 'dialog-cruzzy-tree-view',
  templateUrl: './cruzzy-tree-view.component.html',
  styleUrls: ['./cruzzy-tree-view.component.scss']
})
export class CruzzyTreeViewComponent implements OnInit {
  @Input() cruzzyForm: FormGroup;
  @Input() data: IDynamicDialogTreeView;
  companyItems: TreeviewItem[];
  selectedCompanies: number[];

  constructor(
    public _treeViewUtils: TreeViewUtils,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Guarda os itens selecionados na Tree
   * 
   * @param values 
   */
  onCompanySelectedChange(values): void {
    this.selectedCompanies = values;
    this.cruzzyForm.get('companies').setValue(this.selectedCompanies);
  }

  onCompanyCheckedChange(): void {
    this.cruzzyForm.markAsDirty();
  }
}
