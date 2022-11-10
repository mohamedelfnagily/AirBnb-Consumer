import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MoneyFilterDto } from '../home/DTOs/money-filter-dto';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  userFavourites:any = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) { 
    let x:any = localStorage.getItem("userFavourites");
    let arr = new Array();
    if(x !=null){
    for(var i=0;i<JSON.parse(x).length;i++)
    {
      arr.push(JSON.parse(x)[i]);
    }
    this.userFavourites.next(arr.length);
  }
  }
    //Get all properties
    getAllProperties():Observable<any>{
      return this._HttpClient.get('https://localhost:7218/api/Property/GetAllProperties');
    }
    //Getting Property Data
    getProperty(propertyId:string):Observable<any>{
      return this._HttpClient.get(`https://localhost:7218/api/Property/GetPropertyById/${propertyId}`);
    }
    //Getting all properties of specific user
    getUserProperties(userId:string):Observable<any>{
      return this._HttpClient.get(`https://localhost:7218/api/Property/GetUserProperties/${userId}`)
    }
    //Delete selected property by user
    deleteProperty(propId:string):Observable<any>{
      return this._HttpClient.delete(`https://localhost:7218/api/Property/DeleteProperty/${propId}`);
    }

    //Add new property
    AddProperty(propertyData:any):Observable<any>{
      const formData = new FormData();
      // optional you can pass a file name as third parameter
      formData.append('Description', propertyData.Description);
      formData.append('Location', propertyData.Location);
      formData.append('Price', propertyData.Price);
      formData.append('Rating', propertyData.Rating);
      formData.append('PropertyType', propertyData.PropertyType);
      formData.append('MaxNumberOfUsers', propertyData.MaxNumberOfUsers);
      formData.append('NumberOfRooms', propertyData.NumberOfRooms);
      formData.append('Wifi', propertyData.Wifi);
      formData.append('Parking', propertyData.Parking);
      formData.append('Tv', propertyData.Tv);
      formData.append('Washer', propertyData.Washer);
      formData.append('Elevator', propertyData.Elevator);
      formData.append('PrivateRoom', propertyData.PrivateRoom);
      formData.append('SmokeAlarm', propertyData.SmokeAlarm);
      formData.append('SeaView', propertyData.SeaView);
      formData.append('CategoryId', propertyData.CategoryId);
      formData.append('HosterId', propertyData.HosterId);
      let file:File[] = new Array();
    for (let i = 0; i < propertyData.Pictures.length; i++) {
      formData.append('Pictures', propertyData.Pictures[i]);
      
    }
      // formData.append('Pictures', file);
      return this._HttpClient.post('https://localhost:7218/api/Property/AddProperty',formData);
    }
    //This method is responsible for setting user favourite properties in the local storage
    setUserFavourites(favProperty:any){
      if(this.removeFavouriteProperty(favProperty))
      {
        let userFavProps:any|null =localStorage.getItem("userFavourites");
        if(userFavProps==null)
        {
          let favs:any[] = new Array();
          favs.push(favProperty);
          localStorage.setItem('userFavourites',JSON.stringify(favs))
        }
        else{
          let x:any = localStorage.getItem("userFavourites");
          let arr = new Array();
          for(var i=0;i<JSON.parse(x).length;i++)
          {
            arr.push(JSON.parse(x)[i]);
          }
          arr.push(favProperty);
          localStorage.setItem('userFavourites',JSON.stringify(arr));
        this.userFavourites.next(arr.length)
        }
      }
      else{
        let x:any = localStorage.getItem("userFavourites");
        let arr = new Array();
        for(let i=0;i<JSON.parse(x).length;i++)
        {
          arr.push(JSON.parse(x)[i]);
        }
        for (let i = 0; i < arr.length; i++) {
          if(arr[i]==favProperty)
          {
            arr.splice(i,1);
          }
          
        }
        localStorage.setItem('userFavourites',JSON.stringify(arr));
        this.userFavourites.next(arr.length)
      }


    }
    removeFavouriteProperty(properId:string):boolean
    {
      let x:any = localStorage.getItem("userFavourites");
      if(x!=null)
      {
        let arr = new Array();
        for(let i=0;i<JSON.parse(x).length;i++)
        {
          arr.push(JSON.parse(x)[i]);
        }
        for(let i=0;i<arr.length;i++)
        {
          if(arr[i]==properId)
          {
            return false;
          }
        }
      }
      return true;
    }
    //Those methods are respnsible for filtering the properties depending on the user selection

    //Filtering by price
    filterByMoneyRange(filterdto:MoneyFilterDto):Observable<any>{
      return this._HttpClient.post('https://localhost:7218/api/Property/GetByPriceRange',filterdto);
    }
    //Filter by property type
    filterByPropertyType(propertyType:string):Observable<any>{
      return this._HttpClient.post('https://localhost:7218/api/Property/GetByPriceRange',propertyType);
    }
    //Filter by number of rooms
    filterByRoomsNumber(roomsNumber:number):Observable<any>
    {
      return this._HttpClient.post('https://localhost:7218/api/Property/GetByNumberOfRooms',roomsNumber);
    }
    //Filter by essentials
    filterByEssentials(essentials:string[]):Observable<any>{
      return this._HttpClient.post('https://localhost:7218/api/Property/GetByEssentials',essentials);
    }
    //Filter by languages
    filterByLanguages(languages:string[]):Observable<any>{
      return this._HttpClient.post('https://localhost:7218/api/Property/GetByLanguages',languages);
    }
}
