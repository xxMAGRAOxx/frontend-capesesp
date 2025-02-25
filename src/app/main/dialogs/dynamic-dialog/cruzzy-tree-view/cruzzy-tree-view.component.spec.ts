import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzzyTreeViewComponent } from './cruzzy-tree-view.component';

describe('CruzzyTreeViewComponent', () => {
  let component: CruzzyTreeViewComponent;
  let fixture: ComponentFixture<CruzzyTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruzzyTreeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzzyTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
