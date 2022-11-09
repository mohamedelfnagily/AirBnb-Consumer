import { Component, NgZone, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../Interfaces/login-dto';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private clientId = environment.clientId
  Error:string="";
  isLoggedIn:boolean=false;
  constructor(private _AuthenticationService:AuthenticationService,private _Router:Router,private _ngZone: NgZone) { }
  loginForm:FormGroup=new FormGroup({
    Email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)])
  });
  ngOnInit(): void {
    //External login implementation
          // @ts-ignore
          window.onGoogleLibraryLoad = () => {
            // @ts-ignore
            google.accounts.id.initialize({
              client_id: this.clientId,
              callback: this.handleCredentialResponse.bind(this),
              auto_select: false,
              cancel_on_tap_outside: true
            });
            // @ts-ignore
            google.accounts.id.renderButton(
            // @ts-ignore
            document.getElementById("buttonDiv"),
              { theme: "outline", size: "large", width: "100%" } 
            );
            // @ts-ignore
            google.accounts.id.prompt((notification: PromptMomentNotification) => {});
          };
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

  async handleCredentialResponse(response: CredentialResponse) {
    // debugger;
    await this._AuthenticationService.LoginWithGoogle(response.credential).subscribe(
      (x:any) => {
        //debugger;
        localStorage.setItem("userToken",x.token);
        this._AuthenticationService.setUserData();
        this._ngZone.run(() => {
          this._Router.navigate(['/Home']);
        })},
      (error:any) => {
        this.Error= "Invalid userName or password";
        }
      );  
  }

}
