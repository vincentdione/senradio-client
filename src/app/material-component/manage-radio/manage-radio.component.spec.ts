import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRadioComponent } from './manage-radio.component';

describe('ManageRadioComponent', () => {
  let component: ManageRadioComponent;
  let fixture: ComponentFixture<ManageRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
