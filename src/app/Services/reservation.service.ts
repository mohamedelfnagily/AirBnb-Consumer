import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ReservationAddDto } from '../home/DTOs/reservation-add-dto';
import { ReservationDetailsDto } from '../home/DTOs/reservation-details-dto';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservationDetails:any = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) { }
  //This method is responsible for setting the reservation details from property details component
  setReservationDetails(reservationDetails:ReservationDetailsDto):void{
    this.reservationDetails.next(reservationDetails);
  }
  //Add new reservation
  addReservation(reservation:ReservationAddDto):Observable<any>{
    return this._HttpClient.post('https://localhost:7218/api/Reservation/CreateReservation',reservation);
  }
  //Get user reservations
  getUserReservations(userId:string):Observable<any>{
    return this._HttpClient.get(`https://localhost:7218/api/Reservation/GetUserReservations/${userId}`)
  }
  getPropertyFutureReservations(propertyId:string):Observable<any>{
    return this._HttpClient.get(`https://localhost:7218/api/Reservation/GetPropertyFutureReservations/${propertyId}`)
  }
  getPropertyActiveReservations(propertyId:string):Observable<any>{
    return this._HttpClient.get(`https://localhost:7218/api/Reservation/GetPropertyActiveReservation/${propertyId}`)
  }
}
