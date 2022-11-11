import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/Interfaces/reservation';
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit {
  userReservation:any;
  state:number=0;
  fakeArray:any;
  decimalPortion:boolean=false;
  reactiveForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
    rating: new FormControl('',[Validators.required]),

  })
  constructor(public reviewService:ReviewService,private _router: Router) { }

  ngOnInit(): void {
    
    this.reviewService.reviewDetail
    
      .subscribe(()=>{
     //   this.reviewService.reviewDetail.next(null);
        this.userReservation = this.reviewService.reviewDetail.getValue();        
        console.log(this.userReservation)
        // state = 0 when user didn't make review for this reservation yet and reservation ended
        // state = 1 when user reservation didn't end yet
        // state = 2 when a review already exists for this reservation
        if(this.userReservation.review==null){
          if(Date.parse(this.userReservation.endDate) <= Date.now()){
            this.state=0;
          }
          else{
            this.state=1;
          }
        }
        else{ // review !=null i.e review already exists
          this.state=2;
          this.fakeArray = new Array(Math.floor(this.userReservation.review.rating));
          if(this.userReservation.review.rating!=Math.floor(this.userReservation.review.rating)){
            this.decimalPortion=true;
          }
        }
        
      });
    
  }
  onSubmit() {
    this.reviewService.AddReservationReview(this.reactiveForm.get('description')?.value,this.reactiveForm.get('rating')?.value,this.userReservation.id).subscribe(
      (respone)=>{
        console.log(respone)
      //  window.location.reload()
      // this.ngOnInit();
        this._router.navigate(['/User/Reservations']);
      },
      (error)=>{
        console.log(error)
      }


    )

  }

}
