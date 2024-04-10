import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstProviderComponent } from './lst-provider.component';

describe('LstProviderComponent', () => {
  let component: LstProviderComponent;
  let fixture: ComponentFixture<LstProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LstProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LstProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
