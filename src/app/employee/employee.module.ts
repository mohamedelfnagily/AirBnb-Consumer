import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing/employee-routing.module';
import { EmployeeManagingUsersComponent } from './employee-managing-users/employee-managing-users.component';
import { EmployeeViewPropertiesComponent } from './employee-view-properties/employee-view-properties.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeSidebarComponent } from './employee-sidebar/employee-sidebar.component';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {SidebarModule} from 'primeng/sidebar';
import { SharedModule } from '../shared/shared.module';
import { EmployeeAccountSettingsComponent } from './employee-account-settings/employee-account-settings.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeeManagingUsersComponent,
    EmployeeViewPropertiesComponent,
    EmployeeDashboardComponent,
    EmployeeSidebarComponent,
    EmployeeAccountSettingsComponent,
   // JsonValuesPipe
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SidebarModule,
    ButtonModule,
    TableModule,
    SharedModule,ReactiveFormsModule
  ],
  exports:[EmployeeDashboardComponent,EmployeeManagingUsersComponent,EmployeeSidebarComponent,EmployeeViewPropertiesComponent,SidebarModule]
})
export class EmployeeModule { }
