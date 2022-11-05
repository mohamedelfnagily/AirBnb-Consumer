import { Component, OnInit } from '@angular/core';
import { ManageEmplyeesService } from 'src/app/Services/manage-emplyees.service';
import { FormControl,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ceo-managing-employees',
  templateUrl: './ceo-managing-employees.component.html',
  styleUrls: ['./ceo-managing-employees.component.css']
})
export class CeoManagingEmployeesComponent implements OnInit {

  constructor(private ManageempService:ManageEmplyeesService) {}
  EmployeeAddForm:FormGroup=new FormGroup({
    FirstName:new FormControl(null,[Validators.minLength(3),Validators.maxLength(15),Validators.required]),
    LastName:new FormControl(null,[Validators.minLength(3),Validators.maxLength(15),Validators.required]),
    UserName:new FormControl(null,[Validators.minLength(3),Validators.maxLength(15),Validators.required]),
    Email:new FormControl(null,[Validators.email,Validators.required]),
    PhoneNumber:new FormControl(null,[Validators.pattern(/^01[0125][0-9]{8}/),Validators.required]),
    BirthDate:new FormControl(null,[Validators.required]),
    Password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}/)]),
    Salary:new FormControl(0,[Validators.required]),
    SSN:new FormControl(null,[Validators.required,Validators.minLength(14),Validators.maxLength(14)]),
    Role:new FormControl(null,[Validators.required]),

  }
   
    
  )

  ngOnInit(): void {
  }

}
