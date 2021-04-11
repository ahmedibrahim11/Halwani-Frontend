import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalServiceRequestComponent } from './personal-service-request.component';

describe('PersonalServiceRequestComponent', () => {
  let component: PersonalServiceRequestComponent;
  let fixture: ComponentFixture<PersonalServiceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalServiceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
