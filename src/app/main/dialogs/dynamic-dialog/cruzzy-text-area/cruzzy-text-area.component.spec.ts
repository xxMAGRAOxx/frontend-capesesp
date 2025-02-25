import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzzyTextAreaComponent } from './cruzzy-text-area.component';

describe('CruzzyTextAreaComponent', () => {
  let component: CruzzyTextAreaComponent;
  let fixture: ComponentFixture<CruzzyTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruzzyTextAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzzyTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
