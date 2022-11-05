import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPropertiesComponent } from './all-properties/all-properties.component';
import { PropertydetailsComponent } from './propertydetails/propertydetails.component';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing/home-routing.module';

@NgModule({
  declarations: [
    AllPropertiesComponent,
    PropertydetailsComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    HomeRoutingModule
  ],
  exports:[AllPropertiesComponent,PropertydetailsComponent]
})
export class HomeModule { }
