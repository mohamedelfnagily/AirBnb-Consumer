import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Interfaces/category';
import { Property } from 'src/app/Interfaces/property';
import { CategoriesService } from 'src/app/Services/categories.service';
import { PropertyService } from 'src/app/Services/property.service';
import { MoneyFilterDto } from '../DTOs/money-filter-dto';

@Component({
  selector: 'app-all-properties',
  templateUrl: './all-properties.component.html',
  styleUrls: ['./all-properties.component.css']
})
export class AllPropertiesComponent implements OnInit {

  constructor(private _CategoriesService:CategoriesService,public _PropertyService:PropertyService) { }
  AllCategories:Category[] = [];
  AllProperties:Property[]=[];
  AllPropertiesImages:any[]=[];
  filteringLanguages:string[]=[];
  filteringEssentials:string[]=[];
  filteringNumberOfRooms:number=0;
  priceRange:MoneyFilterDto={minPrice:0,maxPrice:0};
  filteringRoomType:string='';
  imageCount:number=0;
  imgSrc:string='';
  userFavourites:any;
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
    }, 300);
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
  //Get ALl propertyies
  GetAllProperties(){
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

    this._PropertyService.setUserFavourites(propertyId);
  }
  //Filtering section
  //filter by languages
  filterByLanguages(lang:string):void{
    let flag=true;
    if(this.filteringLanguages.length>0)
    {
      for (let i = 0; i < this.filteringLanguages.length; i++) {
        if(lang==this.filteringLanguages[i])
        {
          flag=false;
        }
      }
      if(flag)
      {
        this.filteringLanguages.push(lang);
      }
      else{
        let index = this.filteringLanguages.indexOf(lang);
        this.filteringLanguages.splice(index,1);
      }
    }
    else{
      this.filteringLanguages.push(lang);
    }
  }
  //filter by essentials
  filterByEssentials(essential:string):void
  {
    let flag=true;
    if(this.filteringEssentials.length>0)
    {
      for (let i = 0; i < this.filteringEssentials.length; i++) {
        if(essential==this.filteringEssentials[i])
        {
          flag=false;
        }
      }
      if(flag)
      {
        this.filteringEssentials.push(essential);
      }
      else{
        let index = this.filteringEssentials.indexOf(essential);
        this.filteringEssentials.splice(index,1);
      }
    }
    else{
      this.filteringEssentials.push(essential);
    }
    console.log(this.filteringEssentials)
  }
  //filter by number of rooms
  filterByRooms(numberOfRooms:number):void{
    this.filteringNumberOfRooms=numberOfRooms;
  }
  //filter by property type
  filterByProprtyType(roomType:string):void{
    this.filteringRoomType=roomType;
  }
  //filter by price
  filterByMoney():void{
    let minimumPrice = (<HTMLInputElement>document.getElementById('minimumPrice')).value;
    let maximumPrice = (<HTMLInputElement>document.getElementById('maximumPrice')).value;
    this.priceRange={
      minPrice:Number(minimumPrice),
      maxPrice:Number(maximumPrice)
    }
  }
  //Incrementing views
  incrimentPropertyView(propertyId:string):void
  {
    let property:any;
    this._PropertyService.getProperty(propertyId).subscribe(
      (response)=>{
        property=response;
        if(property.hoster.id!=localStorage.getItem('userId'))
          this._PropertyService.incrimentView(propertyId).subscribe(
            (response)=>{console.log(response)},
            (error)=>{console.log(error)}
          );
      },
      (error)=>{console.log(error)}
    );

  }
  //Getting all filters
  getFilters()
  {
    let propertiesToBeFiltered=this.AllProperties;
    let filteredProperties=[];
    //This flag is an indication if the property is filtered or not
    let flag=false;
    //Filtering by money
    this.filterByMoney();
    if(this.priceRange.minPrice==0&&this.priceRange.maxPrice==0)
    {
      filteredProperties=propertiesToBeFiltered;
    }
    else{
      for (let i = 0; i < propertiesToBeFiltered.length; i++) {
        if(this.priceRange.minPrice<=propertiesToBeFiltered[i].price&&this.priceRange.maxPrice>=propertiesToBeFiltered[i].price)
        {
          filteredProperties.push(propertiesToBeFiltered[i]);
        }
        
      }
      flag=true;
    }
    //Filtering by property type
    // @ts-ignore
    let filteredElements2=[];
    if(filteredProperties.length>0)
    {
      if(this.filteringRoomType!='')
      {
        for (let i = 0; i < filteredProperties.length; i++) {
          if(flag)
          {
            if(filteredProperties[i].propertyType==this.filteringRoomType)
            {
              filteredElements2.push(filteredProperties[i]);
            }
          }
          else{
            if(filteredProperties[i].propertyType==this.filteringRoomType)
            {
              filteredElements2.push(filteredProperties[i]);
            }
          }
        }
        flag=true;
      }
      //This condition means that it is not filtered by price nor room type
      else 
      {
        filteredElements2 = filteredProperties
      }
    }
    //Filtering by number of rooms
    // @ts-ignore
    let filteredElements3=[];
    if(filteredElements2.length>0)
    {
      if(this.filteringNumberOfRooms!=0)
      {
        for (let i = 0; i < filteredElements2.length; i++) {
          if(flag)
          {
            if(filteredProperties[i].numberOfRooms==this.filteringNumberOfRooms)
            {
             // @ts-ignore
              filteredElements3.push(filteredElements2[i]);
            }
          }
          else{
            if(filteredProperties[i].numberOfRooms==this.filteringNumberOfRooms)
            {
              // @ts-ignore
              filteredElements3.push(filteredElements2[i]);
            }
          }
        }
        flag=true;
      }
      //This condition means any number of rooms
      else 
      {
        // @ts-ignore
        filteredElements3 = filteredElements2
      }
    }
    // //Filtering by Essentials
    // // @ts-ignore
    // let filteredElements4=[];
    // if(this.filteringEssentials.length>0)
    // {
    //   // @ts-ignore
    //   let requestResponse=[];
    //   this._PropertyService.filterByEssentials(this.filteringEssentials).subscribe(
    //     (response)=>{
    //       requestResponse=response;
    //       console.log(response)
    //     },
    //     (error)=>{console.log(error)}
    //   );
    //     setTimeout(() => {
    //       if(filteredElements3.length>0)
    //       {
    //         for (let i = 0; i < requestResponse.length; i++) {
    //           //@ts-ignore
    //           for (let j = 0; j < this.filteredElements3.length; j++) {
    //             // @ts-ignore
    //             if(requestResponse[i].id==this.filteredElements3[j].id)
    //             {
    //             // @ts-ignore
    //               filteredElements4.push(this.filteredElements3[j])
    //             }
    //           }
              
    //       }
          
    //      }
    //      else{
    //       //@ts-ignore
    //       filteredElements4=requestResponse;
    //      }
    //     }, 100);

    // }
    // //@ts-ignore
    // console.log(filteredElements4);
  }
}
