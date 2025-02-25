import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzzyListComponent } from './cruzzy-list.component';

describe('CruzzyListComponent', () => {
  let component: CruzzyListComponent;
  let fixture: ComponentFixture<CruzzyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruzzyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzzyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
