import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,BehaviorSubject} from 'rxjs';
import jwtDecode from 'jwt-decode';
import { RegisterDto } from '../authentication/Interfaces/register-dto';
import { TokenDto } from '../authentication/Interfaces/token-dto';
import { LoginDto } from '../authentication/Interfaces/login-dto';
@Injectable({
  providedIn: 'root'
})
//This service is responsible for the authentication process of the users
export class AuthenticationService {
  //User data/Roles will be as a behaviour subject to subscribe on it's values with everychange
  userData:any = new BehaviorSubject(null);
  userRole:any=new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient,private _Router:Router) {
        //To stay logged in even after Refresh
        if(localStorage.getItem("userToken")!=null)
        {
          this.setUserData();
        }
   }
  //Getting encoded user data
  setUserData():void
  {
    let encodedToken =JSON.stringify(localStorage.getItem("userToken"));
    let decodedToken:any = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
    localStorage.setItem('userRole',decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
    localStorage.setItem('userId',decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    this.userRole.next(localStorage.getItem('userRole'));
  }
  //Regestring new user
  Register(userData:RegisterDto):Observable<any>
  {
    return this._HttpClient.post('https://localhost:7218/api/CreateUser',userData);
  }
  //Login user
  Login(userData:LoginDto):Observable<any>
  {
    return this._HttpClient.post('https://localhost:7218/api/Authentication/Login',userData);
  }
  //Logging out user
  LogOut():void{
    this.userData.next(null);
    localStorage.removeItem("userToken");
    this._Router.navigate(['/Login']);
    localStorage.removeItem('userRole');
    this.userRole.next(null);
  }
}
