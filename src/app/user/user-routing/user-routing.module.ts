import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserPropertiesComponent } from '../user-properties/user-properties.component';
import { UserAuthGuard } from 'src/app/Guards/user-auth.guard';
import { UserSwitchHostingComponent } from '../user-switch-hosting/user-switch-hosting.component';
//This module is responsible for the routings of the user module as it will be lazy loaded
let route:Routes=[
  {path:"",component:UserPropertiesComponent,canActivate:[UserAuthGuard]},
  {path:"Profile/:id",component:UserProfileComponent,canActivate:[UserAuthGuard]},
  {path:"Host/:id",component:UserSwitchHostingComponent,canActivate:[UserAuthGuard]}
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
