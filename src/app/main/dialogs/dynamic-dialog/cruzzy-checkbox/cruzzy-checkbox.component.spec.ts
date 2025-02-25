import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzzyCheckboxComponent } from './cruzzy-checkbox.component';

describe('CruzzyCheckboxComponent', () => {
  let component: CruzzyCheckboxComponent;
  let fixture: ComponentFixture<CruzzyCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruzzyCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzzyCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
