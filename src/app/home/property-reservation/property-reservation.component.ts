import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/Services/property.service';
import { ReservationService } from 'src/app/Services/reservation.service';
import { ReservationAddDto } from '../DTOs/reservation-add-dto';
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
  confirmAndPayBtnAvailable:boolean=false;
  constructor(private _ReservationService:ReservationService,private _PropertyService:PropertyService,private _Router:Router) { }

  ngOnInit(): void {
    this._ReservationService.reservationDetails.subscribe(
      ()=>{
        this.userReservationDetails= this._ReservationService.reservationDetails.getValue();
        console.log(this.userReservationDetails);
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
    if(JSON.parse(this.userReservationDetails.UserId)!=this.userReservationDetails.HosterId)
    {
      this.confirmAndPayBtnAvailable=true;
    }
  }

  AddReservation():void{
    let startsDate = new Date(this.userReservationDetails.StartDate);
    startsDate.setDate(startsDate.getDate()+1);
    let endsDate = new Date(this.userReservationDetails.EndDate);
    endsDate.setDate(endsDate.getDate()+1);
    let reservationData:ReservationAddDto={
      propertyId:this.userReservationDetails.PropertyId,
      userId:JSON.parse(this.userReservationDetails.UserId),
      startDate:startsDate.toISOString(),
      endDate:endsDate.toISOString()
    }
    console.log(reservationData);
    if(reservationData!=null)
    {
      this._ReservationService.addReservation(reservationData).subscribe(
        (response)=>{
          console.log(response);
          this._Router.navigateByUrl('/Home');
        },
        (error)=>{console.log(error)}
      );
    }
  }
}
