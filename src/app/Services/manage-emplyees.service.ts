import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeRegisterDto } from '../ceo/Interfaces/employee-register-dto';
import { EmployeeModule } from '../employee/employee.module';
import { EmployeeUpdateDto } from '../ceo/Interfaces/employee-update-dto';
@Injectable({
  providedIn: 'root'
})
export class ManageEmplyeesService {

  constructor(private _HttpClient:HttpClient) { }

//getting all employees
getAllEmployees():Observable<any>{
  return this._HttpClient.get<EmployeeRegisterDto[]>('https://localhost:7218/api/Employee/GetAll');
}
//getting employee by id
getEmployeeById(id:string):Observable<any>{
  return this._HttpClient.get<EmployeeRegisterDto>(`https://localhost:7218/api/Employee/GetById/${id}`);
}
//delete employee by id
deleteEmployeeById(empid:string):Observable<any>{
  return this._HttpClient.delete(`https://localhost:7218/api/Employee/DeleteEmployee/${empid}`);
}
//update employee
UpdateEmployee(empNewData:EmployeeUpdateDto):Observable<any>
  {
    const formData = new FormData();
    formData.append('Id', empNewData.id);
    formData.append('FirstName', empNewData.firstName);
    formData.append('LastName', empNewData.lastName);
    formData.append('UserName', empNewData.userName);
    formData.append('LastName', empNewData.phoneNumber);
    formData.append('BirthDate', empNewData.birthDate);
    formData.append('UserName', empNewData.salary);
    formData.append('Email', empNewData.email);
    formData.append('SSN', empNewData.ssn);
    formData.append('BirthDate', empNewData.role);

    return this._HttpClient.put('https://localhost:7218/api/Employee/',empNewData);
    }

//Regestring new Employee
Register(userNewData:EmployeeRegisterDto):Observable<any>
{
  const formData = new FormData();
  formData.append('FirstName', userNewData.firstName);
  formData.append('LastName', userNewData.lastName);
  formData.append('UserName', userNewData.userName);
  formData.append('Email', userNewData.email);
  formData.append('BirthDate', userNewData.birthDate);
  formData.append('Password', userNewData.password);
  formData.append('PhoneNumber', userNewData.phoneNumber);
  formData.append('SSN', userNewData.ssn);
  formData.append('Salary', userNewData.salary);
  formData.append('Role', userNewData.role);
  return this._HttpClient.post('https://localhost:7218/api/Employee/CreateEmployee',userNewData);
}

}
