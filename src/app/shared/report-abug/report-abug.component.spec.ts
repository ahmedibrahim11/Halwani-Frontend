import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportABugComponent } from './report-abug.component';

describe('ReportABugComponent', () => {
  let component: ReportABugComponent;
  let fixture: ComponentFixture<ReportABugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportABugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportABugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
