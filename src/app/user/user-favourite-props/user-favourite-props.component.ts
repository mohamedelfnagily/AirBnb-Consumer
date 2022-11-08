import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/Interfaces/property';
import { PropertyService } from 'src/app/Services/property.service';

@Component({
  selector: 'app-user-favourite-props',
  templateUrl: './user-favourite-props.component.html',
  styleUrls: ['./user-favourite-props.component.css']
})
export class UserFavouritePropsComponent implements OnInit {
  favPropertiesId:string[]=[];
  favProperties:Property[]=[];
  constructor(private _PropertyService:PropertyService) { }

  ngOnInit(): void {
    let x:any = localStorage.getItem("userFavourites");
    for(let i=0;i<JSON.parse(x).length;i++)
    {
      this.favPropertiesId.push(JSON.parse(x)[i]);
    }
    for (let i = 0; i < this.favPropertiesId.length; i++) {
      this._PropertyService.getProperty(this.favPropertiesId[i]).subscribe(
        (response)=>{
          // this.favProperties.push(response);
          console.log(response)
          this.favProperties.push(response);
        },
        (error)=>{
          console.log(error);
        }
      );
      
    }
    console.log(this.favPropertiesId)
    console.log(this.favProperties)

  }


}
