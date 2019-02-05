import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/services/auth-service/auth.service';
import { map } from 'rxjs/operators';
// import { AuthService } from '../services/auth-service/auth.service'; // Comprobar que auth-service está dentro de donde tiene que estar

@Injectable({
  providedIn: 'root'
})
export class LogoutActivateGuard implements CanActivate {
  constructor(private router: Router,
    private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLogged().pipe(
      map(result => {
        if (result) {
          this.router.navigate(['/restaurants']);
        }
          return !result;
      }));
  }
}
