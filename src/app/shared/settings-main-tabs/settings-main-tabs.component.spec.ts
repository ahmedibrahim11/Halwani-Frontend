import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMainTabsComponent } from './settings-main-tabs.component';

describe('SettingsMainTabsComponent', () => {
  let component: SettingsMainTabsComponent;
  let fixture: ComponentFixture<SettingsMainTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsMainTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsMainTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
