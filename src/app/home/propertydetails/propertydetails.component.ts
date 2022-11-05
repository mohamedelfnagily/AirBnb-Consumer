import { AfterContentInit, Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/Services/property.service';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/Interfaces/property';
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-propertydetails',
  templateUrl: './propertydetails.component.html',
  styleUrls: ['./propertydetails.component.css']
})
export class PropertydetailsComponent implements OnInit {

  constructor(private _PropertyService:PropertyService, private _ActivatedRoute:ActivatedRoute,private _UserService:UserService) { }
  value:string="";
  inline:boolean=true;
  myProperty:any;
  userId:string='';
  userImg:string='';
  ngOnInit(): void {
   let myVal:string = this._ActivatedRoute.snapshot.params['id'];
   this.myProperty = this._PropertyService.getProperty(myVal).subscribe(
    (response)=>{
      this.myProperty=response;
      this.userImg ="data:image/png;base64,"+ this.myProperty.hoster.profilePicture;
      this.userId = response.hoster.id;
      console.log(response);
    },
    (error)=>{console.log(error)}
   );
  }

}
