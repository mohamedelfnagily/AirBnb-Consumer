import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean=false;
  constructor(private _AuthenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this._AuthenticationService.userData.subscribe(()=>{
      if( this._AuthenticationService.userData.getValue()!=null)
      {
        this.isLoggedIn=true;
      }
      else{
        this.isLoggedIn=false;
      }
    });
  }
  CallLogOut():void{
    this._AuthenticationService.LogOut();
  }
}
