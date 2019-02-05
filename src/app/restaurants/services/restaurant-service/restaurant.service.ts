import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../../interfaces/restaurant';
import { IComment } from '../../interfaces/icomment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  readonly BASE_URL = 'restaurants';

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<{restaurants: Restaurant[]}>(this.BASE_URL)
      .pipe(map(resp => resp.restaurants.map(r => {
        r.image = environment.baseUrl + '/' + r.image;
        return r;
      })));
  }

  getRestaurantsMine(): Observable<Restaurant[]> {
    return this.http.get<{restaurants: Restaurant[]}>(`${this.BASE_URL}/mine`)
      .pipe(map(resp => resp.restaurants.map(r => {
        r.image = environment.baseUrl + '/' + r.image;
        return r;
      })));
  }

  getRestaurantsFromUser(id: number): Observable<Restaurant[]> {
    return this.http.get<{restaurants: Restaurant[]}>(`${this.BASE_URL}/user/${id}`)
      .pipe(map(resp => resp.restaurants.map(r => {
        r.image = environment.baseUrl + '/' + r.image;
        return r;
      })));
  }

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<{restaurant: Restaurant}>(`${this.BASE_URL}/${id}`)
      .pipe(
        map(resp => {
          const r = resp.restaurant;
          r.image = environment.baseUrl + '/' + r.image;
          return r;
        })
      );
  }

  addRestaurant(rest: Restaurant): Observable<Restaurant> {
    return this.http.post<{restaurant: Restaurant}>(this.BASE_URL, rest)
    .pipe(map(resp => {
      const r = resp.restaurant;
      r.image = environment.baseUrl + '/' + r.image;
      return r;
    }));
  }

  updateRestaurant(rest: Restaurant): Observable<Restaurant> {
    return this.http.put<{restaurant: Restaurant}>(`${this.BASE_URL}/${rest.id}`, rest)
    .pipe(map(resp => {
      const r = resp.restaurant;
      r.image = environment.baseUrl + '/' + r.image;
      return r;
    }));
  }

  deleteRestaurant(id: number): Observable<void> {
    return this.http.delete<{restaurant: Restaurant}>(`${this.BASE_URL}/${id}`)
      .pipe(
        map(resp => {
          return;
        })
      );
  }

  getCommentsFromRestaurant(id: Number): Observable<IComment[]> {
    return this.http.get<{comments: IComment[]}>(`${this.BASE_URL}/${id}/comments`)
    .pipe(map(resp => resp.comments.map(c => {
      c.user.avatar = environment.baseUrl + '/' + c.user.avatar;
      return c;
    })));
  }

  addComment(newComment: IComment, id: Number): Observable<IComment> {
    return this.http.post<{comment: IComment}>(`${this.BASE_URL}/${id}/comments`, newComment )
      .pipe(map(resp => {
        const c = resp.comment;
        c.user.avatar = environment.baseUrl + '/' + c.user.avatar;
        return c;
      }));
  }
}
