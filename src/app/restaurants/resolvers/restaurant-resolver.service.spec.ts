import { TestBed } from '@angular/core/testing';

import { RestaurantResolver } from './restaurant-resolver.service';

describe('RestaurantResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestaurantResolver = TestBed.get(RestaurantResolver);
    expect(service).toBeTruthy();
  });
});
