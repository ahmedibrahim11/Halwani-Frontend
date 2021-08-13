import { TestBed } from '@angular/core/testing';

import { HelpCenterFilterService } from './help-center-filter.service';

describe('HelpCenterFilterService', () => {
  let service: HelpCenterFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpCenterFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
