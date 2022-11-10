import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HosterProfileDto } from '../home/DTOs/hoster-profile-dto';
import { Property } from '../Interfaces/property';
import { PropertyService } from '../Services/property.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-hoster-profile',
  templateUrl: './hoster-profile.component.html',
  styleUrls: ['./hoster-profile.component.css']
})
export class HosterProfileComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute, private _UserService:UserService,private _PropertyService:PropertyService) { }
  userID:string=this._ActivatedRoute.snapshot.params['id'];
  userData:HosterProfileDto|null=null;
  userImg:string='';
  userQRCode:string='';
  hosterProps:Property[]=[];
  propertyImages:string[]=[];
  ngOnInit(): void {
    this._UserService.getUserData(this.userID).subscribe(
      (response)=>{
        this.userData=response;
      this.userImg ="data:image/png;base64,"+ this.userData?.profilePicture;
      this.userQRCode ="data:image/png;base64,"+ this.userData?.userQRCode;
        console.log(this.userData)
      },
      (error)=>{console.log(error)}
    );
    this._PropertyService.getUserProperties(this.userID).subscribe(
      (response)=>{
        this.hosterProps=response;
        for(var i=0;i<this.hosterProps.length;i++)
        {
          if(this.hosterProps[i].pictures.length>0)
          {
            this.propertyImages.push('data:image/png;base64,'+this.hosterProps[i].pictures[0]['picture']);
          }
          else{
            this.propertyImages.push('../../../assets/Images/NotFoundImage.jpg')
          }
        }
      },
      (error)=>{console.log(error)}
    );
  }
}

