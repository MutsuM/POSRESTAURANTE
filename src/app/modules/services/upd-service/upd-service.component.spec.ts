import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdServiceComponent } from './upd-service.component';

describe('UpdServiceComponent', () => {
  let component: UpdServiceComponent;
  let fixture: ComponentFixture<UpdServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
