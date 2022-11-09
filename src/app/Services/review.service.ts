import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private _HttpClient:HttpClient) { }
  //this method is responsible for getting specific property reviews
  GetPropertyReviews(propertyId:string):Observable<any>{
    return this._HttpClient.get(`https://localhost:7218/api/Review/GetPropertyReviews/${propertyId}`);
  }
}
