import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/Services/property.service';
import { ReservationService } from 'src/app/Services/reservation.service';
import { ReservationDetailsDto } from '../DTOs/reservation-details-dto';

@Component({
  selector: 'app-property-reservation',
  templateUrl: './property-reservation.component.html',
  styleUrls: ['./property-reservation.component.css']
})
export class PropertyReservationComponent implements OnInit {
  userReservationDetails:any;
  reservedProperty:any;
  propertyImage:string='';
  constructor(private _ReservationService:ReservationService,private _PropertyService:PropertyService) { }

  ngOnInit(): void {
    this._ReservationService.reservationDetails.subscribe(
      ()=>{
        this.userReservationDetails= this._ReservationService.reservationDetails.getValue();
        console.log("reser details"+this.userReservationDetails.NumberOfDaysPrice);
          this._PropertyService.getProperty(this.userReservationDetails.PropertyId).subscribe(
            (response)=>{
              this.reservedProperty=response;
              if(this.reservedProperty.pictures.length>0){
                this.propertyImage="data:image/png;base64,"+this.reservedProperty.pictures[0]['picture'];
              }
            },
            (error)=>{console.log(error)}
          );
  
        
       
      }
    );
  }

}
