import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstServiceComponent } from './lst-service.component';

describe('LstServiceComponent', () => {
  let component: LstServiceComponent;
  let fixture: ComponentFixture<LstServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LstServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LstServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
