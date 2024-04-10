import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstCategoryComponent } from './lst-category.component';

describe('LstCategoryComponent', () => {
  let component: LstCategoryComponent;
  let fixture: ComponentFixture<LstCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LstCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LstCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
