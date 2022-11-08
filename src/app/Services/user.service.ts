import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HttpClient:HttpClient) { }
  //Get user data
  getUserData(id:string):Observable<any>
  {
    return this._HttpClient.get(`https://localhost:7218/api/User/GetById/${id}`);
  }

  //Update user data
  updateUser(userNewData:any,file:File):Observable<any>
  {
    const formData = new FormData();
    // optional you can pass a file name as third parameter
    formData.append('Id', userNewData.Id);
    formData.append('FirstName', userNewData.FirstName);
    formData.append('LastName', userNewData.LastName);
    formData.append('UserName', userNewData.UserName);
    formData.append('BirthDate', userNewData.BirthDate);
    formData.append('Email', userNewData.Email);
    formData.append('PhoneNumber', userNewData.PhoneNumber);
    formData.append('ProfilePicture', file);
    return this._HttpClient.put('https://localhost:7218/api/User',formData);
  }
  getAllUsers():Observable<any>{
    return this._HttpClient.get(`https://localhost:7218/api/User/GetAll`);
  }
  BanUser(userId:string,Months:number):Observable<any>{
    let obj:any={
      id : userId,
      numberOfMonths : Months
    };
    return this._HttpClient.put('https://localhost:7218/api/User/BanUser',obj);
  }

}
