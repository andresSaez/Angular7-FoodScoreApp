import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsPageComponent } from './restaurants-page/restaurants-page.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { RestaurantFilterPipe } from './pipes/restaurant-filter.pipe';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';

import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { RestaurantCommentComponent } from './restaurant-comment/restaurant-comment.component';


@NgModule({
  declarations: [
    RestaurantsPageComponent,
    RestaurantFormComponent,
    RestaurantFilterPipe,
    RestaurantCardComponent,
    RestaurantDetailsComponent,
    RestaurantCommentComponent
  ],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    FormsModule,
    SharedModule,
    NgxMapboxGLModule
  ]
})
export class RestaurantsModule { }
