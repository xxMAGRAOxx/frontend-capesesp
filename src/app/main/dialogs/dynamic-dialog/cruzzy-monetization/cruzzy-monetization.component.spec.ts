import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzzyMonetizationComponent } from './cruzzy-monetization.component';

describe('CruzzyMonetizationComponent', () => {
  let component: CruzzyMonetizationComponent;
  let fixture: ComponentFixture<CruzzyMonetizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruzzyMonetizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzzyMonetizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
