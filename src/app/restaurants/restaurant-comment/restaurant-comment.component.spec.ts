import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantCommentComponent } from './restaurant-comment.component';

describe('RestaurantCommentComponent', () => {
  let component: RestaurantCommentComponent;
  let fixture: ComponentFixture<RestaurantCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
