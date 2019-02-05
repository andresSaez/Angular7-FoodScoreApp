import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantService } from '../services/restaurant-service/restaurant.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Show } from '../enums/enum-show';
import { trigger, transition, animate, style, state, query, stagger } from '@angular/animations';

@Component({
  selector: 'fs-restaurants-page',
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.scss'],
  animations: [
    trigger('restaurantItem', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-100px)'}),
        animate('200ms ease-out', style({ opacity: 1, transform: 'none'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(100px) '}))
      ]),
      state('selected', style({ transform: 'translateY(-10px)', boxShadow: '0 12px 16px rgba(0,0,0, 0.2)'})),
      transition('* => selected', animate('200ms ease-in')),
      transition('selected => *', animate('200ms ease-out')),
    ]),
    trigger('restaurantList', [
      transition(':enter', [
        query('fs-restaurant-card', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(100, animate('500ms ease-out', style({ opacity: 1, transform: 'none'})))
        ])
      ])
    ])
  ]
})
export class RestaurantsPageComponent implements OnInit {
  restaurants: Restaurant[] = [];
  orderByName = false;
  showOpen = false;
  search = '';


  constructor(
    private titleService: Title,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    const show = this.route.snapshot.data.show;
    this.titleService.setTitle('Angular foodscore | Restaurants');

    if (show === Show.ALL) {
      this.restaurantService.getRestaurants().subscribe(
        (restaurants) => {
          this.restaurants = restaurants;
        },
        error => console.log(error),
        () => console.log('Restaurants loaded')
      );
    }

    if (show === Show.MINE) {
      this.restaurantService.getRestaurantsMine().subscribe(
        (restaurants) => {
          this.restaurants = restaurants;
        },
        error => console.log(error),
        () => console.log('Restaurants loaded')
      );
    }

    if (show === Show.ASSIST) {
      this.restaurantService.getRestaurantsFromUser(id).subscribe(
        (restaurants) => {
          this.restaurants = restaurants;
        },
        error => console.log(error),
        () => console.log('Restaurants loaded')
      );
    }
  }

  delete(rest: Restaurant) {
    console.log(rest.id);
    const i = this.restaurants.indexOf(rest);
    this.restaurantService.deleteRestaurant(rest.id).subscribe(
      ok => {
        this.restaurants = this.restaurants.slice(0, i).concat(this.restaurants.slice(i + 1));
      },
      error => console.log('no se ha podido borrar')
    );
  }

  toggleSelected(rest: Restaurant) {
    rest.state = rest.state === 'selected' ? '' : 'selected';
  }
}
