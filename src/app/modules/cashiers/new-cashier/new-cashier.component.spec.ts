import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCashierComponent } from './new-cashier.component';

describe('NewCashierComponent', () => {
  let component: NewCashierComponent;
  let fixture: ComponentFixture<NewCashierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCashierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
