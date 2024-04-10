import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstSalesComponent } from './lst-sales.component';

describe('LstSalesComponent', () => {
  let component: LstSalesComponent;
  let fixture: ComponentFixture<LstSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LstSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LstSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
