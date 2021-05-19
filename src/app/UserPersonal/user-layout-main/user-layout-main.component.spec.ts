import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLayoutMainComponent } from './user-layout-main.component';

describe('UserLayoutMainComponent', () => {
  let component: UserLayoutMainComponent;
  let fixture: ComponentFixture<UserLayoutMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLayoutMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLayoutMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
