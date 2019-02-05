import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantsPageComponent } from './restaurants-page/restaurants-page.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { RestaurantResolver } from './resolvers/restaurant-resolver.service';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { Show } from './enums/enum-show';
import { EditRestaurantDeactivateGuard } from '../guards/edit-restaurant-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: RestaurantsPageComponent,
    data: { show: Show.ALL, animation: 'restaurantsPage' }
    // canActivate: [LoginActivateGuard]
  },
  {
    path: 'details/:id',
    component: RestaurantDetailsComponent,
    // canActivate: [LoginActivateGuard],
    resolve: { restaurant: RestaurantResolver },
    data: { animation: 'restaurantDetail' }
  },
  {
    path: 'new',
    component: RestaurantFormComponent
    // canActivate: [LoginActivateGuard]
  },
  {
    path: 'edit/:id',
    component: RestaurantFormComponent,
    canDeactivate: [EditRestaurantDeactivateGuard],
    data: { animation: 'restaurantEditForm' }
  },
  {
    path: 'mine',
    component: RestaurantsPageComponent,
    data: { show: Show.MINE }
  },
  {
    path: 'user/:id',
    component: RestaurantsPageComponent,
    data: { show: Show.ASSIST }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
