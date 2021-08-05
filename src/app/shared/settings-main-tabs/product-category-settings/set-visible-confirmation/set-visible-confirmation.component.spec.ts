import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetVisibleConfirmationComponent } from './set-visible-confirmation.component';

describe('SetVisibleConfirmationComponent', () => {
  let component: SetVisibleConfirmationComponent;
  let fixture: ComponentFixture<SetVisibleConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetVisibleConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetVisibleConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
