import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private _HttpClient:HttpClient) { }
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
    
}
