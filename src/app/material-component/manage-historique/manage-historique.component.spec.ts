import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHistoriqueComponent } from './manage-historique.component';

describe('ManageHistoriqueComponent', () => {
  let component: ManageHistoriqueComponent;
  let fixture: ComponentFixture<ManageHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageHistoriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
