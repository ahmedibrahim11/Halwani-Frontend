import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketoptionsComponent } from './ticketoptions.component';

describe('TicketoptionsComponent', () => {
  let component: TicketoptionsComponent;
  let fixture: ComponentFixture<TicketoptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketoptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
