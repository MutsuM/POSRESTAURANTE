import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdSalesComponent } from './upd-sales.component';

describe('UpdSalesComponent', () => {
  let component: UpdSalesComponent;
  let fixture: ComponentFixture<UpdSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
