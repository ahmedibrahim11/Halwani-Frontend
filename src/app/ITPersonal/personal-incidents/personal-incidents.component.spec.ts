import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalIncidentsComponent } from './personal-incidents.component';

describe('PersonalIncidentsComponent', () => {
  let component: PersonalIncidentsComponent;
  let fixture: ComponentFixture<PersonalIncidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalIncidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
