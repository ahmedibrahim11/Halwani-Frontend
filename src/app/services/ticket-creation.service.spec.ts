import { TestBed } from '@angular/core/testing';

import { TicketCreationService } from './ticket-creation.service';

describe('TicketCreationService', () => {
  let service: TicketCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
