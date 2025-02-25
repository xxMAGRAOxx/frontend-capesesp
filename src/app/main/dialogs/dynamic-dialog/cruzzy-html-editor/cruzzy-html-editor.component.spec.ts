import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzzyHtmlEditorComponent } from './cruzzy-html-editor.component';

describe('CruzzyHtmlEditorComponent', () => {
  let component: CruzzyHtmlEditorComponent;
  let fixture: ComponentFixture<CruzzyHtmlEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruzzyHtmlEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzzyHtmlEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
