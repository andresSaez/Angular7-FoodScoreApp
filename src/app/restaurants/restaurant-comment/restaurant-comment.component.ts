import { Component, OnInit, Input } from '@angular/core';
import { IComment } from '../interfaces/icomment';

@Component({
  selector: 'fs-restaurant-comment',
  templateUrl: './restaurant-comment.component.html',
  styleUrls: ['./restaurant-comment.component.scss']
})
export class RestaurantCommentComponent implements OnInit {
  @Input() restComment: IComment;
  fullStars: number[];
  emptyStars: number[];

  constructor() { }

  ngOnInit() {
    this.fullStars = (new Array(Math.round(this.restComment.stars))).fill(1);
    this.emptyStars = (new Array(5 - Math.round(this.restComment.stars))).fill(1);
  }
}
