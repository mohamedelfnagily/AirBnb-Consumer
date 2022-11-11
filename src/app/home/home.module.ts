import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPropertiesComponent } from './all-properties/all-properties.component';
import { PropertydetailsComponent } from './propertydetails/propertydetails.component';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing/home-routing.module';
import {GMapModule} from 'primeng/gmap';
import { PropertyMapComponent } from './property-map/property-map.component';
import { PropertyReservationComponent } from './property-reservation/property-reservation.component';
import { PropertyHosterProfileComponent } from './property-hoster-profile/property-hoster-profile.component';
@NgModule({
  declarations: [
    AllPropertiesComponent,
    PropertydetailsComponent,
    PropertyMapComponent,
    PropertyReservationComponent,
    PropertyHosterProfileComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    HomeRoutingModule,
    GMapModule
  ],
  exports:[AllPropertiesComponent,PropertydetailsComponent,PropertyMapComponent]
})
export class HomeModule { }
