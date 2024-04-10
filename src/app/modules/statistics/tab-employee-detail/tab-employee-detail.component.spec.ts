import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEmployeeDetailComponent } from './tab-employee-detail.component';

describe('TabEmployeeDetailComponent', () => {
  let component: TabEmployeeDetailComponent;
  let fixture: ComponentFixture<TabEmployeeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabEmployeeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEmployeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
