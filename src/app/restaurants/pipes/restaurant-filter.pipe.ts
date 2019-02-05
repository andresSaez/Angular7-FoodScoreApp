import { Pipe, PipeTransform } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';

@Pipe({
  name: 'restaurantFilter'
})
export class RestaurantFilterPipe implements PipeTransform {

  transform(restaurants: Restaurant[], orderByName: boolean, showOpen: boolean, search: string): any {
    let restFiltered = this.filterName(restaurants, search);
    if (orderByName) {
      restFiltered = this.orderRestName(restFiltered);
    }
    if (showOpen) {
      restFiltered = this.filterOpen(restFiltered);
    }
    return restFiltered;
  }

  private orderRestName(rests: Restaurant[]): Restaurant[] {
    return rests.sort((r1, r2) => r1.name.localeCompare(r2.name));
  }

  private filterOpen(rests: Restaurant[]): Restaurant[] {
    const today = new Date().getDay();
    return rests.filter(r => r.daysOpen.includes(today));
  }

  private filterName(rests: Restaurant[], search: string): Restaurant[] {
    if (search !== '') {
      return rests.filter(r => r.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    } else {
      return rests;
    }
  }

}
