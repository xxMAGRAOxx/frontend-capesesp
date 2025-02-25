import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzzyAccordionComponent } from './cruzzy-accordion.component';

describe('CruzzyAccordionComponent', () => {
  let component: CruzzyAccordionComponent;
  let fixture: ComponentFixture<CruzzyAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruzzyAccordionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzzyAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
