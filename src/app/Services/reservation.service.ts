import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
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
}
