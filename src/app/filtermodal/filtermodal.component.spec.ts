import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltermodalComponent } from './filtermodal.component';

describe('FiltermodalComponent', () => {
  let component: FiltermodalComponent;
  let fixture: ComponentFixture<FiltermodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltermodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
