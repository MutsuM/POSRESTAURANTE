import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdProviderComponent } from './upd-provider.component';

describe('UpdProviderComponent', () => {
  let component: UpdProviderComponent;
  let fixture: ComponentFixture<UpdProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
