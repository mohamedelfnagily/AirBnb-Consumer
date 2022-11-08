import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CeoRoutingModule } from './ceo-routing/ceo-routing.module';
import { CeoManagingUsersComponent } from './ceo-managing-users/ceo-managing-users.component';
import { CeoManagingEmployeesComponent } from './ceo-managing-employees/ceo-managing-employees.component';
import { CeoViewPropertiesComponent } from './ceo-view-properties/ceo-view-properties.component';
import { CeoDashboardComponent } from './ceo-dashboard/ceo-dashboard.component';
import { CeoSideBarComponent } from './ceo-side-bar/ceo-side-bar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ReactiveFormsModule } from '@angular/forms';
import { CeoManageEmployeeDetailsComponent } from './ceo-manage-employee-details/ceo-manage-employee-details.component';
import { CeoEditEmployeeComponent } from './ceo-edit-employee/ceo-edit-employee.component';



@NgModule({
  declarations: [
    CeoManagingUsersComponent,
    CeoManagingEmployeesComponent,
    CeoViewPropertiesComponent,
    CeoDashboardComponent,
    CeoSideBarComponent,
    CeoManageEmployeeDetailsComponent,
    CeoEditEmployeeComponent,
  
    
  
  ],
  imports: [
    CommonModule,
    CeoRoutingModule,SidebarModule,ReactiveFormsModule
  ],
  exports:[CeoDashboardComponent,CeoManagingEmployeesComponent,CeoManagingUsersComponent,CeoViewPropertiesComponent,CeoSideBarComponent,SidebarModule]
})
export class CeoModule { }
