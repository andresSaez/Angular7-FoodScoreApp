import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'fs-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit, OnChanges {
  @Input() rating: number;
  auxRating: number;
  @Output() changeRating = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.auxRating = this.rating;
  }

  ngOnChanges() {
    this.auxRating = this.rating;
  }

  change() {
    this.changeRating.emit(this.auxRating);
  }

}
