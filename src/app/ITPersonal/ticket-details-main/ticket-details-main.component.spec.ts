import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailsMainComponent } from './ticket-details-main.component';

describe('TicketDetailsMainComponent', () => {
  let component: TicketDetailsMainComponent;
  let fixture: ComponentFixture<TicketDetailsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDetailsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
