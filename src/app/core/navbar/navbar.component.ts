import { AfterContentChecked, AfterViewInit, Component, DoCheck, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ManageEmplyeesService } from 'src/app/Services/manage-emplyees.service';
import { PropertyService } from 'src/app/Services/property.service';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLoggedIn:boolean=false;
  userImage:string='';
  userId:string='';
  userProfileUrl:string='';
  userfullName:string='';
  user:User|null=null;
  userFavProperties:number=0;
  constructor(private _AuthenticationService:AuthenticationService,private _UserService:UserService,private _Router:Router,private _PropertyService:PropertyService,private _ManageEmplyeesService:ManageEmplyeesService) {
   }

  ngOnInit(): void {
    this._AuthenticationService.userData.subscribe(()=>{
      if( this._AuthenticationService.userData.getValue()!=null)
      {
        this.isLoggedIn=true;
        setTimeout(() => {
          let userid = <string>localStorage.getItem("userId");
          console.log(userid)
          if(localStorage.getItem('userRole')=='User')
          {
            this._UserService.getUserData(userid).subscribe(
              (response)=>{
                this.user=response;
                console.log(this.user)
               if(this.user?.profilePicture.length!=0)
                 this.userImage ="data:image/png;base64,"+ this.user?.profilePicture;
                this.userfullName=this.user?.firstName+ ' ' + this.user?.lastName;
              },
              (error) =>{
                console.log(error)
              }
            );
          }
          else{
            this._ManageEmplyeesService.getEmployeeById(userid).subscribe(
              (response)=>{
                this.user=response;
                
                console.log(this.user)
               if(this.user?.profilePicture.length!=0)
                 this.userImage ="data:image/png;base64,"+ this.user?.profilePicture;
                this.userfullName=this.user?.firstName+ ' ' + this.user?.lastName;
              },
              (error)=>{console.log(error)}
            );
          }

        }, 100);
      }
      else{
        this.isLoggedIn=false;
      }
    });
    this._PropertyService.userFavourites.subscribe(
      ()=>{this.userFavProperties = this._PropertyService.userFavourites.getValue()}
    );
  }
  CallLogOut():void{
    this._AuthenticationService.LogOut();
  }
  NavigateToUserProfile():void
  {
    let userid = <string>localStorage.getItem("userId");
    this.userProfileUrl='/User/Profile/'+userid;
    this._Router.navigateByUrl(this.userProfileUrl);
  }
  NavigateToHosterProfile():void
  {
    let userid = <string>localStorage.getItem("userId");
    let userUrl='/User/Host/'+userid;
    this._Router.navigateByUrl(userUrl);
  }
}
