import { TestBed } from '@angular/core/testing';

import { SpinnerFlagService } from './spinner-flag.service';

describe('SpinnerFlagService', () => {
  let service: SpinnerFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerFlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
