import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzzyFileComponent } from './cruzzy-file.component';

describe('CruzzyFileComponent', () => {
  let component: CruzzyFileComponent;
  let fixture: ComponentFixture<CruzzyFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruzzyFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzzyFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
