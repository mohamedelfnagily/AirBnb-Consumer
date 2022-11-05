import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing/employee-routing.module';
import { EmployeeManagingUsersComponent } from './employee-managing-users/employee-managing-users.component';
import { EmployeeViewPropertiesComponent } from './employee-view-properties/employee-view-properties.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeSidebarComponent } from './employee-sidebar/employee-sidebar.component';



@NgModule({
  declarations: [
    EmployeeManagingUsersComponent,
    EmployeeViewPropertiesComponent,
    EmployeeDashboardComponent,
    EmployeeSidebarComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ],
  exports:[EmployeeDashboardComponent,EmployeeManagingUsersComponent,EmployeeSidebarComponent,EmployeeViewPropertiesComponent]
})
export class EmployeeModule { }
