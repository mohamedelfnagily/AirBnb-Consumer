import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators} from '@angular/forms';
import { Category } from 'src/app/Interfaces/category';
import { CategoriesService } from 'src/app/Services/categories.service';
import { PropertyService } from 'src/app/Services/property.service';

//This component is responsible for adding new property
@Component({
  selector: 'app-user-properties',
  templateUrl: './user-properties.component.html',
  styleUrls: ['./user-properties.component.css']
})
export class UserPropertiesComponent implements OnInit {
  Error:string='';
  AllCategories:Category[]=[];
  constructor(private _CategoriesService:CategoriesService,private _PropertyService:PropertyService) { }
  propertyAddForm:FormGroup=new FormGroup(
    {
      Description:new FormControl(null),
      Location:new FormControl(null),
      Price:new FormControl(null),
      Rating:new FormControl(0),
      PropertyType:new FormControl(null),
      MaxNumberOfUsers:new FormControl(null),
      NumberOfRooms:new FormControl(null),
      Wifi:new FormControl(false),
      Parking:new FormControl(false),
      Tv:new FormControl(false),
      Washer:new FormControl(false),
      Elevator:new FormControl(false),
      Generator:new FormControl(false),
      PrivateRoom:new FormControl(false),
      SmokeAlarm:new FormControl(false),
      SeaView:new FormControl(false),
      CategoryId:new FormControl(null),
      HosterId:new FormControl(localStorage.getItem('userId')),
      Pictures:new FormControl(null)
    }
  );
  ngOnInit(): void {
    //Getting all categories
    this._CategoriesService.getAllCategories().subscribe(
      (response)=>{this.AllCategories=response},
      (error)=>{console.log(error)}
    );
  }
  submitPropertyToBeAdded(propertyData:FormGroup):void{
    console.log(propertyData.value)
    this._PropertyService.AddProperty(propertyData.value).subscribe(
      (response)=>{console.log(response)},
      (error)=>{console.log(error)}
    );
  }
  //Managing pictures
  file:File[]=[];
  uploadFile(x:any){
    // this.file.push(<HTMLInputElement>x.target.files[0]);
    this.propertyAddForm.value.Pictures = <HTMLInputElement>x.target.files;
 }

}
