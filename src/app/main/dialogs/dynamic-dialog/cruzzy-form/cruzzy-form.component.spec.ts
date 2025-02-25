import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzzyFormComponent } from './cruzzy-form.component';

describe('CruzzyFormComponent', () => {
  let component: CruzzyFormComponent;
  let fixture: ComponentFixture<CruzzyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruzzyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzzyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
