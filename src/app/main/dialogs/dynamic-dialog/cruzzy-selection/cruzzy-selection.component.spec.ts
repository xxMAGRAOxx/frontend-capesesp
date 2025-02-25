import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzzySelectionComponent } from './cruzzy-selection.component';

describe('CruzzySelectionComponent', () => {
  let component: CruzzySelectionComponent;
  let fixture: ComponentFixture<CruzzySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruzzySelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzzySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
