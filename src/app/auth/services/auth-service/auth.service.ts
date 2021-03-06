import { Injectable, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseLogin } from '../../interfaces/response-login';
import { ResponseValidate } from '../../interfaces/response-validate';
import { Iuser } from '../../interfaces/iuser';
import { ILoginGoogleFbRequest } from '../../interfaces/ilogin-google-fb-request';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BASE_URL = 'auth';
  logged = false;
  loginChange$ = new EventEmitter<boolean>();
  constructor(private http: HttpClient) { }

  login(userInfo: Iuser): Observable<void> {
    return this.http.post<ResponseLogin>(`${this.BASE_URL}/login`, userInfo)
      .pipe(map(resp => {
        localStorage.setItem(environment.TOKEN, resp.accessToken);
        this.logged = true;
        this.loginChange$.emit(true);
      }
      ));
  }

  logout() {
    const userToken = localStorage.getItem(environment.TOKEN);

        if (userToken !== null) {
          localStorage.removeItem(environment.TOKEN);
          this.logged = false;
          this.loginChange$.emit(false);
        }
  }

  isLogged(): Observable<boolean> {
    const userToken = localStorage.getItem(environment.TOKEN);

    if (this.logged) {
      return of(true);
    } else {
      if (userToken !== null) {
        return this.http.get<ResponseValidate>(`${this.BASE_URL}/validate`)
          .pipe(
            map(resp => {
              if (resp.ok) {
                this.logged = true;
                this.loginChange$.emit(true);
              }
              return resp.ok;
          }));
      } else {
        return of(false);
      }
    }
  }

  register(userInfo: Iuser): Observable<void> {
    return this.http.post<any>(`${this.BASE_URL}/register`, userInfo )
      .pipe(map(resp => {
      }
      ));
  }

  loginGoogle(peticion: ILoginGoogleFbRequest): Observable<void> {
    return this.http.post<ResponseLogin>(`${this.BASE_URL}/google`, peticion)
      .pipe(map(resp => {
        localStorage.setItem(environment.TOKEN, resp.accessToken);
        this.logged = true;
        this.loginChange$.emit(true);
      }
      ));
  }

  loginFacebook(peticion: ILoginGoogleFbRequest): Observable<void> {
    return this.http.post<ResponseLogin>(`${this.BASE_URL}/facebook`, peticion)
      .pipe(map(resp => {
        localStorage.setItem(environment.TOKEN, resp.accessToken);
        this.logged = true;
        this.loginChange$.emit(true);
      }
      ));
  }
}
