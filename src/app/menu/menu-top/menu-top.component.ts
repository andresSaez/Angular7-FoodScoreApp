import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth-service/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth-service/auth.service'; // Comprobar si la ubicación del servicio está donde debería

@Component({
  selector: 'fs-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.scss']
})
export class MenuTopComponent implements OnInit {
  userLoggued = false;
  constructor(private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.authService.loginChange$.subscribe(loggued => {
      this.userLoggued = loggued;
    });
  }

  logout() {
    event.preventDefault();
    const resp = swal({
      title: 'Are you sure?',
      text: 'You are going to close the session.',
      showCancelButton: true,
      confirmButtonColor: '#308d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
      }
    });
  }
}


