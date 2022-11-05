import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Interfaces/category';
import { Property } from 'src/app/Interfaces/property';
import { CategoriesService } from 'src/app/Services/categories.service';
import { PropertyService } from 'src/app/Services/property.service';

@Component({
  selector: 'app-all-properties',
  templateUrl: './all-properties.component.html',
  styleUrls: ['./all-properties.component.css']
})
export class AllPropertiesComponent implements OnInit {

  constructor(private _CategoriesService:CategoriesService,private _PropertyService:PropertyService) { }
  AllCategories:Category[] = [];
  AllProperties:Property[]=[];
  imgSrc:string='';
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe(
      (response)=>{
        this.AllCategories=response;
        console.log(response)
      },
      (error)=>{console.log(error)}
    );
    this._PropertyService.getAllProperties().subscribe(
      (response)=>{
        this.AllProperties=response;
        console.log(response)
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  //Get the properties in this category
  getPropertiesInCat(catName:string)
  {
    this._CategoriesService.getAllPropertiesByCatName(catName).subscribe(
      (response)=>{this.AllProperties=response},
      (error)=>{console.log(error)}
    );
  }
}
