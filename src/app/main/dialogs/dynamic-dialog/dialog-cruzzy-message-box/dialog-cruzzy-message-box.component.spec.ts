import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCruzzyMessageBoxComponent } from './dialog-cruzzy-message-box.component';

describe('DialogCruzzyMessageBoxComponent', () => {
  let component: DialogCruzzyMessageBoxComponent;
  let fixture: ComponentFixture<DialogCruzzyMessageBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCruzzyMessageBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCruzzyMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
