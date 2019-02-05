import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';
import swal from 'sweetalert2';
import { RestaurantService } from '../services/restaurant-service/restaurant.service';

@Component({
  selector: 'fs-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent implements OnInit {
  @Input() restaurant: Restaurant;
  weekDay: number;
  readonly days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  @Output() deleted = new EventEmitter<void>();
  fullStars: number[];
  emptyStars: number[];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.weekDay = new Date().getDay();
    this.restaurant.daysOpen = this.restaurant.daysOpen.map(d => +d);
    this.fullStars = (new Array(Math.round(this.restaurant.stars))).fill(1);
    this.emptyStars = (new Array(5 - Math.round(this.restaurant.stars))).fill(1);
  }

  deleteRestaurant() {
    const resp = swal({
      title: 'Are you sure you want to delete this restaurant?',
      text: 'You won\'t be able to revert this!',
      showCancelButton: true,
      confirmButtonColor: '#308d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.deleted.emit();
      }
    });
  }
}
