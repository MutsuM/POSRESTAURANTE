import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstProductComponent } from './lst-product.component';

describe('LstProductComponent', () => {
  let component: LstProductComponent;
  let fixture: ComponentFixture<LstProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LstProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LstProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
