import { TestBed } from '@angular/core/testing';

import { ShowService } from './shows.service';

describe('ShowsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowService = TestBed.get(ShowService);
    expect(service).toBeTruthy();
  });
});
