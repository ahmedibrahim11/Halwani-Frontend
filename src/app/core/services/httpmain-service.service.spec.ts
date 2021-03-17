import { TestBed } from '@angular/core/testing';

import { HTTPMainServiceService } from './httpmain-service.service';

describe('HTTPMainServiceService', () => {
  let service: HTTPMainServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HTTPMainServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
