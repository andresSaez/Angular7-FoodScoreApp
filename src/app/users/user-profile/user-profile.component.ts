import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Iuser } from 'src/app/auth/interfaces/iuser';

@Component({
  selector: 'fs-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: Iuser;
  zoom = 17;

  constructor(private route: ActivatedRoute,
    private titleService: Title,
    private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('AF | User profile');
    this.user = this.route.snapshot.data.user;
  }

}
