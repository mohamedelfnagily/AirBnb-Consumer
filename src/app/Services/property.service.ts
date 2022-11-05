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
    
}
