import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { Iuser } from '../interfaces/iuser';
import { NgModel } from '@angular/forms';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'fs-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  newUser: Iuser;
  email2: string;
  @ViewChild('fileImage') fileInput: ElementRef;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router,
    private geolocation: GeolocationService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Angular foodscore | Register');
    this.email2 = '';
    this.resetForm();
    this.geolocation.getLocation().then(c => {
      this.newUser.lat = <any>c.latitude;
      this.newUser.lng = <any>c.longitude;
    }).catch(err => {
      this.newUser.lat = 0;
      this.newUser.lng = 0;
    });
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.newUser.avatar = <string>reader.result;
    });
  }

  addUser() {
    this.authService.register(this.newUser).subscribe(
      user => {
        this.resetForm();
        this.router.navigate(['/auth/login']);
      },
      error => console.log(error)
    );
  }

  resetForm() {
    this.newUser = {
      name: '',
      avatar: '',
      email: '',
      password: '',
      lat: 0,
      lng: 0
    };
    this.fileInput.nativeElement.value = '';
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

}
