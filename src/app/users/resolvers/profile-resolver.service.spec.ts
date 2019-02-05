import { TestBed } from '@angular/core/testing';

import { ProfileResolver } from './profile-resolver.service';

describe('ProfileResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileResolver = TestBed.get(ProfileResolver);
    expect(service).toBeTruthy();
  });
});
