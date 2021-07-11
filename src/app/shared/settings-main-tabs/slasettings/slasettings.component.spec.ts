import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SLASettingsComponent } from './slasettings.component';

describe('SLASettingsComponent', () => {
  let component: SLASettingsComponent;
  let fixture: ComponentFixture<SLASettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SLASettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SLASettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
