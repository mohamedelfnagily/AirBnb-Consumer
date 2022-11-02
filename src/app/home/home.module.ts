import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPropertiesComponent } from './all-properties/all-properties.component';
import { PropertydetailsComponent } from './propertydetails/propertydetails.component';
import { RouterModule } from '@angular/router';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AllPropertiesComponent,
    PropertydetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CalendarModule,
    FormsModule
  ],
  exports:[AllPropertiesComponent,PropertydetailsComponent]
})
export class HomeModule { }
