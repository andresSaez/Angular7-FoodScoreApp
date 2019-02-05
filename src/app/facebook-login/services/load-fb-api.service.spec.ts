import { TestBed } from '@angular/core/testing';

import { LoadFbApiService } from './load-fb-api.service';

describe('LoadFbApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadFbApiService = TestBed.get(LoadFbApiService);
    expect(service).toBeTruthy();
  });
});
