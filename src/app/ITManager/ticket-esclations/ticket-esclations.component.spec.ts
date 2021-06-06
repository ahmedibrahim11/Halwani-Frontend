import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketEsclationsComponent } from './ticket-esclations.component';

describe('TicketEsclationsComponent', () => {
  let component: TicketEsclationsComponent;
  let fixture: ComponentFixture<TicketEsclationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketEsclationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketEsclationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
