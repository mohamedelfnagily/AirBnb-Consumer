import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Category } from '../Interfaces/category';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  userToken:any = localStorage.getItem('userToken');
  constructor(private _HttpClient:HttpClient) { }
  //Getting all categories
  getAllCategories():Observable<any>{
    return this._HttpClient.get('https://localhost:7218/api/Category/GetAll');
  }
  //getting properties from category name
  getAllPropertiesByCatName(catName:string):Observable<any>{
    return this._HttpClient.get(`https://localhost:7218/api/Category/GetPropertiesByCategoryName/${catName}`,{headers:this.userToken});
  }
}
