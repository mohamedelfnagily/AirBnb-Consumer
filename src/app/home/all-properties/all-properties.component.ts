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
  AllPropertiesImages:any[]=[];
  imageCount:number=0;
  imgSrc:string='';
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe(
      (response)=>{
        this.AllCategories=response;
        console.log(this.AllCategories)
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

    setTimeout(() => {
      for (let i = 0; i < this.AllProperties.length; i++) {
        let arr = new Array();
        if(this.AllProperties[i].pictures.length==0)
        {
          this.AllPropertiesImages.push(arr);
  
        }
        else{
          for (let j = 0; j < this.AllProperties[i].pictures.length; j++) {
            let properyImage ="data:image/png;base64,"+ this.AllProperties[i].pictures[j]['picture'];
            arr.push(properyImage);
          }
          this.AllPropertiesImages.push(arr);
        }
        
      }
      console.log(this.AllPropertiesImages)
    }, 1000);
  }
  //Get the properties in this category
  getPropertiesInCat(catName:string)
  {
    this._CategoriesService.getAllPropertiesByCatName(catName).subscribe(
      (response)=>{
        this.AllProperties=response;
        console.log(response)
      },
      (error)=>{console.log(error)}
    );
  }
  //This method is responsible for scrolling images
  getNextImage(index:number, elementId:string)
  {
    console.log(this.imageCount);
    let src = "data:image/png;base64,"+ this.AllPropertiesImages[index][this.imageCount];
    
    if(this.AllPropertiesImages[index][this.imageCount]==undefined)
    {
      this.imgSrc = "../../../assets/Images/NotFoundImage.jpg";
    }
    else{

      this.imgSrc = "data:image/png;base64,"+ this.AllPropertiesImages[index][this.imageCount];
      let x = <HTMLElement>document.getElementById(elementId);
      x.setAttribute('src',this.imgSrc);
    }
    this.imageCount+=1;
    if(this.imageCount>4)
    {
      this.imageCount=0;
    }
    console.log(this.AllPropertiesImages[index][this.imageCount])
    console.log(this.imgSrc);
  }
  //This method is responsible for adding property to favourites
  AddToFavourites(elementId:string,propertyId:string):void{
    document.getElementById(elementId)?.classList.toggle('text-danger');
    document.getElementById(elementId)?.classList.toggle('fa-regular');
    document.getElementById(elementId)?.classList.toggle('fa-solid');
    let favProps = localStorage.getItem('userFavourites');
    if(favProps)
    {
      let userFavourites = localStorage.getItem('userFavourites');
    }
    else{
      let arr = [];
      arr.push(propertyId);
      let userFavourites = localStorage.setItem('userFavourites',JSON.stringify(arr));
    }
    console.log(favProps);
  }
}
