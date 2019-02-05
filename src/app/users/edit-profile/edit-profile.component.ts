import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Iuser } from 'src/app/auth/interfaces/iuser';
import { UsersService } from '../services/users-service/users.service';
import swal from 'sweetalert2';

@Component({
  selector: 'fs-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user: Iuser;
  password1: string;
  password2: string;
  nuevoAvatar: string;
  @ViewChild('fileImage') fileInput: ElementRef;

  constructor(private route: ActivatedRoute,
    private titleService: Title,
    private userService: UsersService) { }

  ngOnInit() {
    this.titleService.setTitle('AF | Edit Profile');
    this.resetForms();
    this.user = this.route.snapshot.data.user;
  }

  changePassword() {
    this.userService.savePassword(this.password1).subscribe(
      resp => {
        this.successMessage();
      },
      error => {
        this.errorMessage(error);
      }
    );
  }

  changeAvatar() {
    this.userService.saveAvatar(this.nuevoAvatar).subscribe(
      resp => {
        this.successMessage();
        this.user.avatar = this.nuevoAvatar;
        this.fileInput.nativeElement.value = '';
      },
      error => {
        this.errorMessage(error);
      }
    );
  }

  changeNameAndEmail() {
    this.userService.saveProfile(this.user.name, this.user.email).subscribe(
      resp => {
        this.successMessage();
      },
      error => {
        this.errorMessage(error);
      }
    );
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.nuevoAvatar = <string>reader.result;
    });
  }

  resetForms() {
    this.user = {
      name: '',
      email: '',
      avatar: '',
      password: ''
    };
  }

  successMessage() {
    swal({
      type: 'success',
      title: 'It`s done!',
      text: 'Profile updated!',
    });
  }

  errorMessage(error: string) {
    swal({
      type: 'error',
      title: 'Ups...',
      text: 'An error has ocurred: ' + error,
    });
  }
}
