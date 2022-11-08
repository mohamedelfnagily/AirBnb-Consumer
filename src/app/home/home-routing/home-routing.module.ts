import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllPropertiesComponent } from '../all-properties/all-properties.component';
import { PropertydetailsComponent } from '../propertydetails/propertydetails.component';
import { AuthenticationGuard } from 'src/app/Guards/authentication.guard';
import { NotFoundComponent } from 'src/app/core/not-found/not-found.component';
import { PropertyReservationComponent } from '../property-reservation/property-reservation.component';

let route:Routes=[
  {path:"",canActivate:[AuthenticationGuard],component:AllPropertiesComponent},
  {path:"PropertyDetails/:id",canActivate:[AuthenticationGuard],component:PropertydetailsComponent},
  {path:"PropertyReservation/:id",canActivate:[AuthenticationGuard],component:PropertyReservationComponent},
  {path:"**",component:NotFoundComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports:[RouterModule]
})
export class HomeRoutingModule { }
