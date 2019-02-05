import { TestBed, async, inject } from '@angular/core/testing';

import { EditRestaurantDeactivateGuard } from './edit-restaurant-deactivate.guard';

describe('EditRestaurantDeactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditRestaurantDeactivateGuard]
    });
  });

  it('should ...', inject([EditRestaurantDeactivateGuard], (guard: EditRestaurantDeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
