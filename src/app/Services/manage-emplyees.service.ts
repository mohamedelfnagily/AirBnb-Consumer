import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeRegisterDto } from '../authentication/Interfaces/employee-register-dto';
@Injectable({
  providedIn: 'root'
})
export class ManageEmplyeesService {

  constructor(private _HttpClient:HttpClient) { }
//Regestring new Employee
Register(userNewData:EmployeeRegisterDto,file:File):Observable<any>
{
  const formData = new FormData();
  formData.append('FirstName', userNewData.FirstName);
  formData.append('LastName', userNewData.LastName);
  formData.append('UserName', userNewData.UserName);
  formData.append('Email', userNewData.Email);
  formData.append('BirthDate', userNewData.BirthDate);
  formData.append('Password', userNewData.Password);
  formData.append('PhoneNumber', userNewData.PhoneNumber);
  formData.append('SSN', userNewData.SSN);
  formData.append('Salary', userNewData.Salary);
  formData.append('Role', userNewData.Role);


  return this._HttpClient.post('https://localhost:7218/api/Employee/CreateEmployee',formData);
}

}
