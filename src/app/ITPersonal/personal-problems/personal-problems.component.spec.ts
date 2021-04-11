import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalProblemsComponent } from './personal-problems.component';

describe('PersonalProblemsComponent', () => {
  let component: PersonalProblemsComponent;
  let fixture: ComponentFixture<PersonalProblemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalProblemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
