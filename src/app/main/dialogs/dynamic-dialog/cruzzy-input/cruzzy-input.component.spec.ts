import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzzyInputComponent } from './cruzzy-input.component';

describe('CruzzyInputComponent', () => {
  let component: CruzzyInputComponent;
  let fixture: ComponentFixture<CruzzyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruzzyInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzzyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
