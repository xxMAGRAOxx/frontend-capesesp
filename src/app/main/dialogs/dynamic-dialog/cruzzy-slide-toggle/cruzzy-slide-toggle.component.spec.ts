import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzzySlideToggleComponent } from './cruzzy-slide-toggle.component';

describe('CruzzySlideToggleComponent', () => {
  let component: CruzzySlideToggleComponent;
  let fixture: ComponentFixture<CruzzySlideToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruzzySlideToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzzySlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
