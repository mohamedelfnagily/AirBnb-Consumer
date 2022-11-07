import { Component, OnInit } from '@angular/core';
import { ManageEmplyeesService } from 'src/app/Services/manage-emplyees.service';
import { EmployeeRegisterDto } from 'src/app/authentication/Interfaces/employee-register-dto';

@Component({
  selector: 'app-ceo-edit-employee',
  templateUrl: './ceo-edit-employee.component.html',
  styleUrls: ['./ceo-edit-employee.component.css']
})
export class CeoEditEmployeeComponent implements OnInit {
  employee:EmployeeRegisterDto[]=[];
  constructor(private manageEmployeeService:ManageEmplyeesService) { }

  ngOnInit(): void {
  }

}
