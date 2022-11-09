import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CeoDashboardComponent } from '../ceo-dashboard/ceo-dashboard.component';
import { CeoManagingUsersComponent } from '../ceo-managing-users/ceo-managing-users.component';
import { CeoManagingEmployeesComponent } from '../ceo-managing-employees/ceo-managing-employees.component';
import { CeoViewPropertiesComponent } from '../ceo-view-properties/ceo-view-properties.component';
import { UnAuthorizedComponent } from 'src/app/core/un-authorized/un-authorized.component';
import { CeoAuthGuard } from 'src/app/Guards/ceo-auth.guard';
import { CeoManageEmployeeDetailsComponent } from '../ceo-manage-employee-details/ceo-manage-employee-details.component';
import { CeoEditEmployeeComponent } from '../ceo-edit-employee/ceo-edit-employee.component';

let route:Routes=[
  {path:"",component:CeoDashboardComponent,canActivate:[CeoAuthGuard]},
  {path:"ManageUser",component:CeoManagingUsersComponent,canActivate:[CeoAuthGuard]},
  {path:"ManageEmployee",component:CeoManagingEmployeesComponent,canActivate:[CeoAuthGuard]},
  {path:"ManageProperties",component:CeoViewPropertiesComponent,canActivate:[CeoAuthGuard]},
  {path:"ManageEmployeeDetails",component:CeoManageEmployeeDetailsComponent,canActivate:[CeoAuthGuard]},
  {path:"ManageEmployeeDetails/EditEmployee/:id",component:CeoEditEmployeeComponent,canActivate:[CeoAuthGuard]},


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports:[RouterModule]
})
export class CeoRoutingModule { }
