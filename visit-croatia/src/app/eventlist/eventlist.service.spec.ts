import { TestBed } from '@angular/core/testing';

import { EventlistService } from './eventlist.service';

describe('EventlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventlistService = TestBed.get(EventlistService);
    expect(service).toBeTruthy();
  });
});
