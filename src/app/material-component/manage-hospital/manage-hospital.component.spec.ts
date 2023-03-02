import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHospitalComponent } from './manage-hospital.component';

describe('ManageHospitalComponent', () => {
  let component: ManageHospitalComponent;
  let fixture: ComponentFixture<ManageHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
