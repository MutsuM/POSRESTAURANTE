import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdClientComponent } from './upd-client.component';

describe('UpdClientComponent', () => {
  let component: UpdClientComponent;
  let fixture: ComponentFixture<UpdClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
