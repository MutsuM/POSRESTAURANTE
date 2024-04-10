import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstClientComponent } from './lst-client.component';

describe('LstClientComponent', () => {
  let component: LstClientComponent;
  let fixture: ComponentFixture<LstClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LstClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LstClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
