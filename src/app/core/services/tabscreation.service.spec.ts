import { TestBed } from '@angular/core/testing';

import { TabscreationService } from './tabscreation.service';

describe('TabscreationService', () => {
  let service: TabscreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabscreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
