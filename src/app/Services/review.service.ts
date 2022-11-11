import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Reservation } from '../Interfaces/reservation';
import { Review } from '../Interfaces/review';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviewDetail:any = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient) { }
  setReviewDetail(reviewDetail:Reservation):void{
    this.reviewDetail.next(reviewDetail);
  }
  //this method is responsible for getting specific property reviews
  GetPropertyReviews(propertyId:string):Observable<any>{
    return this._HttpClient.get(`https://localhost:7218/api/Review/GetPropertyReviews/${propertyId}`);
  }
  
  AddReservationReview(desc:any,rate:any,reservId:any):Observable<any>{
    let obj:any={
      description: desc,
      rating: rate,
      reservationId: reservId

    }
    console.log(obj);
    return this._HttpClient.post(`https://localhost:7218/api/Review/AddReview`,obj);
  }
}
