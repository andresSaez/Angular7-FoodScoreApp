import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantService } from '../services/restaurant-service/restaurant.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantResolver implements Resolve<Restaurant> {

  constructor(private restaurantService: RestaurantService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Restaurant> {
    return this.restaurantService.getRestaurant(route.params['id']).pipe(
      catchError(error => { this.router.navigate(['/restaurants']);
        return of(null);
      })
    );
  }
}
