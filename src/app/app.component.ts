import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, query, style, animate, group } from '@angular/animations';

@Component({
  selector: 'fs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition('restaurantsPage => restaurantDetail', [
        query(':enter, :leave', style({ position: 'absolute' })),
        query(':enter', style({ opacity: 0 })),
        query(':leave', style({ opacity: 1 })),
        group([
          query(':leave', [
            animate('0.5s ease-out', style({ opacity: 0 }))
          ]),
          query(':enter', [animate('0.5s ease-out', style({ opacity: 1 }))])
        ])
      ]),
      transition('restaurantDetail => restaurantsPage', [
        query(':enter, :leave', style({ position: 'absolute' })),
        query(':enter', style({ opacity: 0 })),
        query(':leave', style({ opacity: 1 })),
        group([
          query(':leave', [
            animate('0.5s ease-out', style({ opacity: 0 }))
          ]),
          query(':enter', [animate('0.5s ease-out', style({ opacity: 1 }))])
        ])
      ]),
      transition('restaurantEditForm => restaurantDetail', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%' })),
        query(':enter', style({ transform: 'translateX(100%)' })),
        group([
          query(':leave', [
            animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))
          ]),
          query(':enter', [animate('0.5s ease-out', style({ transform: 'none' }))])
        ])
      ]),
      transition('restaurantDetail => restaurantEditForm', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%' })),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        group([
          query(':leave', [
            animate('0.5s ease-out', style({ transform: 'translateX(100%)' }))
          ]),
          query(':enter', [animate('0.5s ease-out', style({ transform: 'none' }))])
        ])
      ]),
      transition('myProfile => editProfile', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' })),
        query(':enter', style({ transform: 'translateY(-100%)' })),
        group([
          query(':leave', [
            animate('0.7s ease-out', style({ transform: 'translateY(100%)' }))
          ]),
          query(':enter', [animate('0.7s ease-out', style({ transform: 'none' }))])
        ])
      ]),
      transition('editProfile => myProfile', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' })),
        query(':enter', style({ transform: 'translateY(100%)' })),
        group([
          query(':leave', [
            animate('0.7s ease-out', style({ transform: 'translateY(-100%)' }))
          ]),
          query(':enter', [animate('0.7s ease-out', style({ transform: 'none' }))])
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title = 'angular-foodscore';
  getState(routerOutlet: RouterOutlet) {
    // Returns the page animation name (or 'None' of it has no animation)
    return routerOutlet.activatedRouteData.animation || 'None';
  }
}
