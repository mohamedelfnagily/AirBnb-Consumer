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
    
}
