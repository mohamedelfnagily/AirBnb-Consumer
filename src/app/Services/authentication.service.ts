import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,BehaviorSubject} from 'rxjs';
import jwtDecode from 'jwt-decode';
import { RegisterDto } from '../authentication/Interfaces/register-dto';
import { TokenDto } from '../authentication/Interfaces/token-dto';
import { LoginDto } from '../authentication/Interfaces/login-dto';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
//This service is responsible for the authentication process of the users
export class AuthenticationService {
  //User data/Roles will be as a behaviour subject to subscribe on it's values with everychange
  userData:any = new BehaviorSubject(null);
  userRole:any=new BehaviorSubject(null);
  private path = environment.apiUrl;
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
    if(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
    {
      localStorage.setItem('userRole',decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
    }
    else{
      localStorage.setItem('userRole','User');

    }
    localStorage.setItem('userId',decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    this.userRole.next(localStorage.getItem('userRole'));
  }
  //Regestring new user
  Register(userNewData:RegisterDto,file:File):Observable<any>
  {
    const formData = new FormData();
    // optional you can pass a file name as third parameter
    formData.append('FirstName', userNewData.FirstName);
    formData.append('LastName', userNewData.LastName);
    formData.append('UserName', userNewData.UserName);
    formData.append('BirthDate', userNewData.BirthDate);
    formData.append('Password', userNewData.Password);
    formData.append('Email', userNewData.Email);
    formData.append('PhoneNumber', userNewData.PhoneNumber);
    formData.append('ProfilePicture', file);
    return this._HttpClient.post('https://localhost:7218/api/User/CreateUser',formData);
  }
  //Login user
  Login(userData:LoginDto):Observable<any>
  {
    return this._HttpClient.post('https://localhost:7218/api/Authentication/Login',userData);
  }
  //Login with google
  //This method is what will hit the api
LoginWithGoogle(credentials: string): Observable<any> {
  let body = {"credentials":credentials.toString()};
  console.log(JSON.stringify(body));
  const header = new HttpHeaders().set('Content-type', 'application/json');
  return this._HttpClient.post(this.path + "Authentication/LoginWithGoogle", JSON.stringify(body),{headers:header});
}
  //Logging out user
  LogOut():void{
    this.userData.next(null);
    localStorage.removeItem("userToken");
    this._Router.navigate(['/Login']);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    this.userRole.next(null);
  }
}
