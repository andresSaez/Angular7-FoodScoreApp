import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { Iuser } from '../interfaces/iuser';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth-service/auth.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { ILoginGoogleFbRequest } from '../interfaces/ilogin-google-fb-request';
// import { AuthService } from 'src/app/services/auth-service/auth.service'; // Comprobar que el auth service está donde tiene que estar

@Component({
  selector: 'fs-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  user: Iuser;
  peticionLoginGoogleFB: ILoginGoogleFbRequest;
  infoError: string;
  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router,
    private geolocation: GeolocationService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Angular foodscore | Login');
    this.resetForm();
    this.geolocation.getLocation().then(c => {
      this.user.lat = <any>c.latitude;
      this.user.lng = <any>c.longitude;
    }).catch(err => {
      this.user.lat = 0;
      this.user.lng = 0;
    });
  }

  checkLogin() {
    this.authService.login(this.user).subscribe(
      us => this.router.navigate(['/restaurants']),
      error => {
        this.infoError = 'Email or password incorrect';
        console.log(error);
      }
    );
  }

  resetForm() {
    this.user = {
      email: '',
      password: '',
      lat: 0,
      lng: 0
    };

    this.infoError = '';

    this.peticionLoginGoogleFB = {
      token: '',
      lat: 0,
      lng: 0
    };
  }

  loggedGoogle(googleUser: gapi.auth2.GoogleUser) {
    this.ngZone.run(() => {
      this.peticionLoginGoogleFB = {
        token: googleUser.getAuthResponse().id_token,
        lat: this.user.lat,
        lng: this.user.lng
      };

      this.authService.loginGoogle(this.peticionLoginGoogleFB).subscribe(
        us => this.router.navigate(['/restaurants']),
        error => {
          console.log(error);
        }
      );
    });
  }

  loggedFacebook(resp: FB.LoginStatusResponse) {
    this.ngZone.run(() => {
      this.peticionLoginGoogleFB = {
        token: resp.authResponse.accessToken,
        lat: this.user.lat,
        lng: this.user.lng
      };
      this.authService.loginFacebook(this.peticionLoginGoogleFB).subscribe(
        us => this.router.navigate(['/restaurants']),
        error => {
          console.log(error);
        }
      );
    });
  }

  showError(error) {
    this.infoError = '';
    this.infoError = error;
    console.log(error);
  }
}
