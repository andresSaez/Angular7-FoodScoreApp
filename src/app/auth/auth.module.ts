import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { GoogleLoginModule } from '../google-login/google-login.module';
import { FacebookLoginModule } from '../facebook-login/facebook-login.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    GoogleLoginModule,
    FacebookLoginModule
  ],
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
  ]
})
export class AuthModule { }
