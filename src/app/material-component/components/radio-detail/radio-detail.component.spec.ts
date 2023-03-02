import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioDetailComponent } from './radio-detail.component';

describe('RadioDetailComponent', () => {
  let component: RadioDetailComponent;
  let fixture: ComponentFixture<RadioDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
