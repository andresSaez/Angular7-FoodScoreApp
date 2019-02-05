import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileResolver } from './resolvers/profile-resolver.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: 'profile/edit',
    component: EditProfileComponent,
    resolve: { user: ProfileResolver },
    data: { animation: 'editProfile' }
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    resolve: { user: ProfileResolver },
    data: { animation: 'myProfile' }
  },
  {
    path: 'profile/:id',
    component: UserProfileComponent,
    resolve: { user: ProfileResolver }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
