import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/Interfaces/property';
import { PropertyService } from 'src/app/Services/property.service';

@Component({
  selector: 'app-user-switch-hosting',
  templateUrl: './user-switch-hosting.component.html',
  styleUrls: ['./user-switch-hosting.component.css']
})
export class UserSwitchHostingComponent implements OnInit {
  userProps:Property[]=[];
  constructor(private _ActivatedRoute:ActivatedRoute,private _PropertyService:PropertyService) { }
  userId:string = this._ActivatedRoute.snapshot.params['id'];
  propImages:string[]=[];
  ngOnInit(): void {
    this._PropertyService.getUserProperties(this._ActivatedRoute.snapshot.params['id']).subscribe(
      (response)=>{
        this.userProps=response;
        for(var i=0;i<this.userProps.length;i++)
        {
          if(this.userProps[i].pictures.length>0)
          {
            this.propImages.push('data:image/png;base64,'+this.userProps[i].pictures[0]['picture']);
          }
          else{
            this.propImages.push('../../../assets/Images/NotFoundImage.jpg')
          }
        }
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  //This methods are responsible for deleting property
  proeprtyToDeleteId:string='';
  PropertyToDelete(id:string):void{
    this.proeprtyToDeleteId=id;
  }
  DeleteProperty():void{
    this._PropertyService.deleteProperty(this.proeprtyToDeleteId.toString()).subscribe(
      (response)=>{
        this._PropertyService.getUserProperties(this._ActivatedRoute.snapshot.params['id']).subscribe(
          (response)=>{
            this.userProps=response;
            console.log(this.userProps);
          },
          (error)=>{
            console.log(error);
          }
        );
      },
      (error)=>{console.log(error)}
    );
  }
}
