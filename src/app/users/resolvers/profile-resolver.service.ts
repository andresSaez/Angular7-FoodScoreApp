import { Injectable } from '@angular/core';
import { Iuser } from 'src/app/auth/interfaces/iuser';
import { UsersService } from '../services/users-service/users.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<Iuser> {

  constructor(private userService: UsersService,
    private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Iuser> {
      if (route.params['id'] && !isNaN(route.params['id'])) {
        return this.userService.getUserProfile(route.params['id']).pipe(
          catchError(error => { this.router.navigate(['/restaurants']);
            return of(null);
          })
        );
      } else {
        return this.userService.getMyProfile().pipe(
          catchError(error => { this.router.navigate(['/restaurants']);
            return of(null);
          })
        );
      }
    }
}
