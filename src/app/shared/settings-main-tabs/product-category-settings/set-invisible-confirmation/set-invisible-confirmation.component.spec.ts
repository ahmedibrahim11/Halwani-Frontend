import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetInvisibleConfirmationComponent } from './set-invisible-confirmation.component';

describe('SetInvisibleConfirmationComponent', () => {
  let component: SetInvisibleConfirmationComponent;
  let fixture: ComponentFixture<SetInvisibleConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetInvisibleConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetInvisibleConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
