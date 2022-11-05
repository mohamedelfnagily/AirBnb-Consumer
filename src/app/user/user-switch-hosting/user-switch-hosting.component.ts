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
  ngOnInit(): void {
    this._PropertyService.getUserProperties(this._ActivatedRoute.snapshot.params['id']).subscribe(
      (response)=>{
        this.userProps=response;
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
      (response)=>{console.log(response)},
      (error)=>{console.log(error)}
    );
  }
}
