import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthTokenInterceptor } from './interceptors/auth-token/auth-token.service';
import { BaseUrlInterceptor } from './interceptors/base-url/base-url.service';
import { MenuModule } from './menu/menu.module';
import { FormsModule } from '@angular/forms';
import { GoogleLoginModule } from './google-login/google-login.module';
import { FacebookLoginModule } from './facebook-login/facebook-login.module';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    SweetAlert2Module,
    MenuModule,
    GoogleLoginModule.forRoot('557331834920-vj2qta552qlmdbdsm5meh1lpl0dd2sod.apps.googleusercontent.com'),
    FacebookLoginModule.forRoot({
      app_id: '398144794266819',
      version: 'v3.2'
    }),
    /*
    FacebookLoginModule.forRoot({
      app_id: '264506843964721',
      version: 'v3.2'
    }),*/
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiYXJ0dXJvYmVyIiwiYSI6ImNqb2l2ZDFhZTA0azkzcHAyMGprcm04a3MifQ.2YFN4pXKpQmAPuVgLExW1w'
    }),
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: BaseUrlInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
