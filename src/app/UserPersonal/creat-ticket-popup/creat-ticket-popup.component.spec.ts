import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatTicketPopupComponent } from './creat-ticket-popup.component';

describe('CreatTicketPopupComponent', () => {
  let component: CreatTicketPopupComponent;
  let fixture: ComponentFixture<CreatTicketPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatTicketPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatTicketPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
