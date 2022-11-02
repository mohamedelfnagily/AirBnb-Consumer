import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { LoginDto } from '../Interfaces/login-dto';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Error:string="";
  isLoggedIn:boolean=false;
  constructor(private _AuthenticationService:AuthenticationService,private _Router:Router) { }
  loginForm:FormGroup=new FormGroup({
    Email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)])
  });
  ngOnInit(): void {
  }
  submitLogin(formInfo:FormGroup)
  {
    let loginData:LoginDto = {
      Email:formInfo.value.Email,
      Password:formInfo.value.password
    }
    this._AuthenticationService.Login(loginData).subscribe(
      (response)=>{
        if(response.token)
        { 
          localStorage.setItem("userToken",response.token);
          this._AuthenticationService.setUserData();
          // let userRole = localStorage.getItem('userRole');
          this._Router.navigate(['/Home']);
        }
      },
      (error)=>{
        this.Error= "Invalid userName or password";
      }
    );
  }

}
