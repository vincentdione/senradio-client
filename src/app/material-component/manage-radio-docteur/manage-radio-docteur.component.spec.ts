import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRadioDocteurComponent } from './manage-radio-docteur.component';

describe('ManageRadioDocteurComponent', () => {
  let component: ManageRadioDocteurComponent;
  let fixture: ComponentFixture<ManageRadioDocteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRadioDocteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRadioDocteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
