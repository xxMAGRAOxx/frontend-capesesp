import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RadioChoiceComponent } from "./radio-choice.component";

describe('RadioChoiceComponent', () => {
  let component: RadioChoiceComponent;
  let fixture: ComponentFixture<RadioChoiceComponent>;
  let matDialogRefMock: any;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    formBuilder = new FormBuilder();

    await TestBed.configureTestingModule({
      declarations: [RadioChoiceComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize title and form on creation', () => {
    expect(component.title).toBeDefined();
    expect(component.dataForm).toBeDefined();
  });

  it('should create form with default type U', () => {
    const form = component.openForm();
    expect(form.get('type').value).toBe('U');
  });

  it('should close dialog with yes and form type value on confirm', () => {
    component.dataForm = formBuilder.group({
      type: new FormControl('U', Validators.required),
    });
    component.confirm();
    expect(matDialogRefMock.close).toHaveBeenCalledWith(['yes', 'U']);
  });
});