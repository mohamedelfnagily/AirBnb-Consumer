import { AfterContentChecked, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit ,OnDestroy{
  isLoggedIn:boolean=false;
  userImage:string='';
  userId:string='';
  userfullName:string='';
  user:User|null=null;
  constructor(private _AuthenticationService:AuthenticationService,private _UserService:UserService) { }

  ngOnInit(): void {
    this._AuthenticationService.userData.subscribe(()=>{
      if( this._AuthenticationService.userData.getValue()!=null)
      {
        this.isLoggedIn=true;
        setTimeout(() => {
          let userid = <string>localStorage.getItem("userId");
          console.log(userid)
          this._UserService.getUserData(userid).subscribe(
            (response)=>{
              console.log(this.user)
              this.user=response;
              this.userImage ="data:image/png;base64,"+ this.user?.profilePicture;
              this.userfullName=this.user?.firstName+ ' ' + this.user?.lastName;
            }
          );
        }, 100);
      }
      else{
        this.isLoggedIn=false;
      }
    });
  }
  
  ngOnDestroy(): void {
    let userid = JSON.stringify(localStorage.getItem("userId"));

    // this.userId = <string>localStorage.getItem('userId');
    console.log(userid);
    console.log('destroy')
  }
  CallLogOut():void{
    this._AuthenticationService.LogOut();
  }
}
