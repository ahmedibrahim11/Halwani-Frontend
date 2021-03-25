import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailsManagerComponent } from './ticket-details-manager.component';

describe('TicketDetailsManagerComponent', () => {
  let component: TicketDetailsManagerComponent;
  let fixture: ComponentFixture<TicketDetailsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDetailsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
