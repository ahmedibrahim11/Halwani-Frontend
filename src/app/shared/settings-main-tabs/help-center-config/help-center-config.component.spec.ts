import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpCenterConfigComponent } from './help-center-config.component';

describe('HelpCenterConfigComponent', () => {
  let component: HelpCenterConfigComponent;
  let fixture: ComponentFixture<HelpCenterConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpCenterConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpCenterConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
