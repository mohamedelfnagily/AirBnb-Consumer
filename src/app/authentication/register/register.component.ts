import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { RegisterDto } from '../Interfaces/register-dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Error:string="";
  constructor(private _AuthenticationService:AuthenticationService , private _Router:Router) { }
  registerForm:FormGroup=new FormGroup({
    firstName:new FormControl(null,[Validators.required,Validators.maxLength(50),Validators.minLength(3)]),
    lastName:new FormControl(null,[Validators.required,Validators.maxLength(50),Validators.minLength(3)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    userName:new FormControl(null,[Validators.required,Validators.maxLength(50),Validators.minLength(3)]),
    mobileNumber:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)]),
    birthDate:new FormControl(null,[Validators.required]),
    profilePicture:new FormControl(null)
  });
  file:any=null;
  uploadFile(x:any){
     this.file = <HTMLInputElement>x.target.files[0];
  }
  ngOnInit(): void {
  }
  submitRegister(formInfo:FormGroup)
  {
    let registerData:RegisterDto={
      Email:formInfo.value.email,
      FirstName:formInfo.value.firstName,
      LastName:formInfo.value.lastName,
      UserName:formInfo.value.userName,
      Password:formInfo.value.password,
      BirthDate:formInfo.value.birthDate,
      ProfilePicture:formInfo.value.profilePicture,
      PhoneNumber:formInfo.value.mobileNumber
    };
    console.log(registerData);
    this._AuthenticationService.Register(registerData,this.file).subscribe(
      (response)=>{
        this._Router.navigate(['/Login']);
      },
      (error)=>{
        this.Error= "Email is already registered before";
      }
    );
  }

}
