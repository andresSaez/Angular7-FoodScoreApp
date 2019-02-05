import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RestaurantService } from '../services/restaurant-service/restaurant.service';
import { Restaurant } from '../interfaces/restaurant';
import { IComment } from '../interfaces/icomment';
import swal from 'sweetalert2';

@Component({
  selector: 'fs-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {
  weekDay: number;
  readonly days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  restaurant: Restaurant;
  zoom = 17;
  comments: IComment[] = [];
  newComment: IComment;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private restaurantService: RestaurantService,
    private router: Router
  ) { }

  ngOnInit() {
    this.resetCommentForm();
    this.weekDay = new Date().getDay();
    this.titleService.setTitle('Angular foodscore | Details');
    this.restaurant = this.route.snapshot.data.restaurant;
    this.restaurantService.getCommentsFromRestaurant(this.restaurant.id).subscribe(
      resp => this.comments = resp,
      error => console.log(error),
      () => console.log('Restaurants loaded')
    );
  }

  resetCommentForm() {
    this.newComment = {
      text: '',
      stars: 0
    };
  }

  changeRating(newRating) {
    this.newComment.stars = newRating;
  }

  addComment() {
    this.restaurantService.addComment(this.newComment, this.restaurant.id).subscribe(
      resp => {
        swal({
          type: 'success',
          title: 'Comment creadted',
          text: 'Your opinion has been added to this restaurant',
        });
        this.comments.push(resp);
        this.restaurant.commented = true;
      },
      error => {
        swal({
          type: 'error',
          title: 'What a hurry...',
          text: 'Please send a comment and rate the restaurant. Error: ' + error,
        });
      },
      () => console.log('Comentario terminado')
    );
  }
}
