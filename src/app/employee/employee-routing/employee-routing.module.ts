import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from '../employee-dashboard/employee-dashboard.component';
import { EmployeeManagingUsersComponent } from '../employee-managing-users/employee-managing-users.component';
import { EmployeeViewPropertiesComponent } from '../employee-view-properties/employee-view-properties.component';
import { AdminAuthGuard } from 'src/app/Guards/admin-auth.guard';
import { SuperAdminAuthGuard } from 'src/app/Guards/super-admin-auth.guard';
import { EmployeeAccountSettingsComponent } from '../employee-account-settings/employee-account-settings.component';
let route:Routes=[
  {path:"",component:EmployeeDashboardComponent,canActivate:[AdminAuthGuard]},
  {path:"ManageUser",component:EmployeeManagingUsersComponent,canActivate:[SuperAdminAuthGuard]},
  {path:"ViewProperties",component:EmployeeViewPropertiesComponent,canActivate:[AdminAuthGuard]},
  {path:"EmployeeAccountSettings/:id",component:EmployeeAccountSettingsComponent,canActivate:[AdminAuthGuard]},


];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports:[RouterModule]
})
export class EmployeeRoutingModule { }
