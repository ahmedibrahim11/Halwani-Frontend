import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalGroupsComponent } from './portal-groups.component';

describe('PortalGroupsComponent', () => {
  let component: PortalGroupsComponent;
  let fixture: ComponentFixture<PortalGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
