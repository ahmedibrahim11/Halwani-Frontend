import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPortalGroupComponent } from './add-portal-group.component';

describe('AddPortalGroupComponent', () => {
  let component: AddPortalGroupComponent;
  let fixture: ComponentFixture<AddPortalGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPortalGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPortalGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
