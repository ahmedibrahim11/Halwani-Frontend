import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskForSupportComponent } from './ask-for-support.component';

describe('AskForSupportComponent', () => {
  let component: AskForSupportComponent;
  let fixture: ComponentFixture<AskForSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskForSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskForSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
