import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEmployeesComponent } from './tab-employees.component';

describe('TabEmployeesComponent', () => {
  let component: TabEmployeesComponent;
  let fixture: ComponentFixture<TabEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
