import { TestBed } from '@angular/core/testing';

import { LoadGoogleApiService } from './load-google-api.service';

describe('LoadGoogleApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadGoogleApiService = TestBed.get(LoadGoogleApiService);
    expect(service).toBeTruthy();
  });
});
