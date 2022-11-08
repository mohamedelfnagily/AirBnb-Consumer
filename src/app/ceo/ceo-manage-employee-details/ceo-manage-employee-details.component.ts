import { Component, OnInit } from '@angular/core';
import { ManageEmplyeesService } from 'src/app/Services/manage-emplyees.service';
import { EmployeeRegisterDto } from 'src/app/authentication/Interfaces/employee-register-dto';

@Component({
  selector: 'app-ceo-manage-employee-details',
  templateUrl: './ceo-manage-employee-details.component.html',
  styleUrls: ['./ceo-manage-employee-details.component.css']
})
export class CeoManageEmployeeDetailsComponent implements OnInit {
  id:string="";
  employees:EmployeeRegisterDto[]=[];

  constructor(private ManageempService:ManageEmplyeesService) {}

  ngOnInit(): void {
    this.ManageempService.getAllEmployees().subscribe(a=>{
      console.log(a);
      this.employees=a;
    })
  }

  getEmployeeById(){
    this.ManageempService.getEmployeeById(this.id).subscribe(e=>{
      console.log(e);
    })
  }
  
  //delete employee by id
  delete(id:string){
    if(confirm('are you sure you want to delete employee?')==true){this.ManageempService.deleteEmployeeById(id).subscribe(a=>{
      console.log(a);
      this.ManageempService.getAllEmployees().subscribe(a=>{
        console.log(a);
        this.employees=a;
      })
    })
 
  }
  }
}
