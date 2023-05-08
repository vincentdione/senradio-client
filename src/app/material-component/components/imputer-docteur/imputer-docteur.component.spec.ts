import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImputerDocteurComponent } from './imputer-docteur.component';

describe('ImputerDocteurComponent', () => {
  let component: ImputerDocteurComponent;
  let fixture: ComponentFixture<ImputerDocteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImputerDocteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImputerDocteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
