import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTableComponentComponent } from './all-table-component.component';

describe('AllTableComponentComponent', () => {
  let component: AllTableComponentComponent;
  let fixture: ComponentFixture<AllTableComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTableComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
