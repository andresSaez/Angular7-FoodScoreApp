import { NgModule } from '@angular/core';
import { Route, RouterModule, PreloadAllModules } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoutActivateGuard } from './guards/logout-activate.guard';
import { LoginActivateGuard } from './guards/login-activate.guard';

const routes: Route[] = [
  { path: 'restaurants',
   canActivate: [LoginActivateGuard],
   loadChildren: './restaurants/restaurants.module#RestaurantsModule'
  },
  {
    path: 'auth',
    canActivate: [LogoutActivateGuard],
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'users',
    canActivate: [LoginActivateGuard],
    loadChildren: './users/users.module#UsersModule'
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: []
})
export class AppRoutingModule { }
