import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserPropertiesComponent } from '../user-properties/user-properties.component';
import { UserAuthGuard } from 'src/app/Guards/user-auth.guard';
import { UserSwitchHostingComponent } from '../user-switch-hosting/user-switch-hosting.component';
import { UserEditPropertyComponent } from '../user-edit-property/user-edit-property.component';
import { UserFavouritePropsComponent } from '../user-favourite-props/user-favourite-props.component';
import { UserReservationsComponent } from '../user-reservations/user-reservations.component';
import { UserReviewComponent } from '../user-review/user-review.component';
//This module is responsible for the routings of the user module as it will be lazy loaded
let route:Routes=[
  {path:"AddProperty",component:UserPropertiesComponent,canActivate:[UserAuthGuard]},
  {path:"Profile/:id",component:UserProfileComponent,canActivate:[UserAuthGuard]},
  {path:"Host/:id",component:UserSwitchHostingComponent,canActivate:[UserAuthGuard]},
  {path:"PropertyEdit/:id",component:UserEditPropertyComponent,canActivate:[UserAuthGuard]},
  {path:"Favourites",component:UserFavouritePropsComponent,canActivate:[UserAuthGuard]},
  {path:"Reservations",component:UserReservationsComponent,canActivate:[UserAuthGuard]},
  {path:"Review",component:UserReviewComponent,canActivate:[UserAuthGuard]}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports:[RouterModule]
})
export class UserRoutingModule { }
