import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSelfComponent } from './assign-self.component';

describe('AssignSelfComponent', () => {
  let component: AssignSelfComponent;
  let fixture: ComponentFixture<AssignSelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignSelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
