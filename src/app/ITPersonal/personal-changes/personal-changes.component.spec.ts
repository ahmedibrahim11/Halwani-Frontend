import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalChangesComponent } from './personal-changes.component';

describe('PersonalChangesComponent', () => {
  let component: PersonalChangesComponent;
  let fixture: ComponentFixture<PersonalChangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalChangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
