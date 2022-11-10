import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/Interfaces/reservation';
import { PropertyService } from 'src/app/Services/property.service';
import { ReservationService } from 'src/app/Services/reservation.service';
import { ReviewService } from 'src/app/Services/review.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit {
  UserId:any="";
  tag:string="";
  reservation:Reservation[]=[];
  constructor(public reservationService:ReservationService,public propertyService:PropertyService,public reviewService:ReviewService,private _router: Router) { }

  ngOnInit(): void {
    this.UserId =   localStorage.getItem("userId"); // getting userId
   // getting all user's reservations
   this.reservationService.getUserReservations(this.UserId).subscribe(

    (response)=>{
      console.log(response)
      this.reservation=response;
      for(let i =0;i<this.reservation.length;i++){
        this.propertyService.getProperty(this.reservation[i].propertyId).subscribe(
        
          (response)=>{
            this.reservation[i].property=response
            if(this.reservation[i].property.pictures.length>0){
              this.reservation[i].propertyImage="data:image/png;base64,"+this.reservation[i].property.pictures[0]['picture'];
            }
          },
          (error)=>{console.log(error)}
    
    
        );
    
    
      }
    },
    (error)=>{console.log(error)}
   );
  }
  NavigateToReview(reserv:Reservation){
    this.reviewService.setReviewDetail(reserv);
    this._router.navigateByUrl('/User/Review');
    
  }



  checkReservationDate(start:string,end:string){
    let startDate = Date.parse(start);
    let endDate  = Date.parse(end);
    if(startDate > Date.now()){
      this.tag="Upcoming";
      return "warning";
    }
    else if(endDate < Date.now()){
      this.tag = "Ended";
      return "danger";
    }
    else{
      this.tag = "Running"
      return "success";
    }

  }
}
