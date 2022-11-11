import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegisterDto } from 'src/app/authentication/Interfaces/register-dto';
import { HosterProfileDto } from 'src/app/home/DTOs/hoster-profile-dto';
import { Property } from 'src/app/Interfaces/property';
import { User } from 'src/app/Interfaces/user';
import { PropertyService } from 'src/app/Services/property.service';
import { UserService } from 'src/app/Services/user.service';
import { HosterPropertiesDto } from '../DTO/hoster-properties-dto';
import { UserDto } from '../DTO/user-dto';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit ,OnChanges{
  user:HosterProfileDto|null=null;
  firstName:string='';
  editProfile:boolean=false;
  userImage:string='';
  Error:string='';
  userQRCode:string='';
  AllProperties:HosterPropertiesDto[]=[];
  PropertiesImage:string[]=[];
  constructor(private _UserService:UserService,private _ActivatedRoute:ActivatedRoute,private _PropertyService:PropertyService) { 
  }
  updateUserDataForm:FormGroup=new FormGroup({});

 
  ngOnInit(): void {

    this._UserService.getUserData(this._ActivatedRoute.snapshot.params['id']).subscribe(
      (response)=>{
        this.user=response;
        this.userImage ="data:image/png;base64,"+ this.user?.profilePicture;
        this.userQRCode ="data:image/png;base64,"+ this.user?.userQRCode;
        //Here we are giving the form its initial values
        this.updateUserDataForm = new FormGroup({
          Id:new FormControl(this._ActivatedRoute.snapshot.params['id']),
          FirstName:new FormControl(this.user?.firstName,[Validators.required,Validators.maxLength(50),Validators.minLength(3)]),
          LastName:new FormControl(this.user?.lastName,[Validators.required,Validators.maxLength(50),Validators.minLength(3)]),
          Email:new FormControl(this.user?.email,[Validators.required,Validators.email]),
          UserName:new FormControl(this.user?.userName,[Validators.required,Validators.maxLength(50),Validators.minLength(3)]),
          PhoneNumber:new FormControl(this.user?.phoneNumber,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
          BirthDate:new FormControl(this.user?.birthDate,[Validators.required]),
          ProfilePicture:new FormControl(null)
        });
      },
      (error)=>{console.log(error)}
    );
    //Getting all properties of the Hoster
      this._PropertyService.getUserProperties(this._ActivatedRoute.snapshot.params['id']).subscribe(
        (response)=>{
          this.AllProperties=response;
          for(var i=0;i<this.AllProperties.length;i++)
          {
            if(this.AllProperties[i].pictures.length>0)
            {
              this.PropertiesImage.push('data:image/png;base64,'+this.AllProperties[i].pictures[0]['picture']);
            }
            else{
              this.PropertiesImage.push('../../../assets/Images/NotFoundImage.jpg')
            }
          }
        },
        (error)=>{console.log(error)}
      );

  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  //This method is responsible for the visability of the editting form
  EditProfileVisability():void{
    this.editProfile=!this.editProfile;
  }
  file:any=null;
  uploadFile(x:any){
     this.file = <HTMLInputElement>x.target.files[0];
  }
  submitEditForm(updateForm:FormGroup):void{
    let pp = null;
    if(updateForm.value.ProfilePicture==null)
    {
      pp=this.user?.profilePicture
    }
    else{
      pp=updateForm.value.ProfilePicture;
    }
    let userData:UserDto={
      Id:this._ActivatedRoute.snapshot.params['id'],
      FirstName:updateForm.value.FirstName,
      LastName:updateForm.value.LastName,
      UserName:updateForm.value.UserName,
      BirthDate:updateForm.value.BirthDate,
      Email:updateForm.value.Email,
      ProfilePicture:pp,
      PhoneNumber:updateForm.value.PhoneNumber
    };
    
    // let body = JSON.stringify(userData);
    this._UserService.updateUser(userData,this.file).subscribe(
      
      (response)=>{console.log(response)},
      (error)=>{console.log(error)}
    );
  }


}
