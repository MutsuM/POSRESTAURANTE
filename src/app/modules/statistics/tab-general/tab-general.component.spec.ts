import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGeneralComponent } from './tab-general.component';

describe('TabGeneralComponent', () => {
  let component: TabGeneralComponent;
  let fixture: ComponentFixture<TabGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
