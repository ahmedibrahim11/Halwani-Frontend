import { TestBed } from '@angular/core/testing';

import { FiltedredObjectService } from './filtedred-object.service';

describe('FiltedredObjectService', () => {
  let service: FiltedredObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltedredObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
