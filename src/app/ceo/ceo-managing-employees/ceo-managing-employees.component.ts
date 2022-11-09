import { Component, OnInit } from '@angular/core';
import { ManageEmplyeesService } from 'src/app/Services/manage-emplyees.service';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { EmployeeRegisterDto } from 'src/app/ceo/Interfaces/employee-register-dto';

@Component({
  selector: 'app-ceo-managing-employees',
  templateUrl: './ceo-managing-employees.component.html',
  styleUrls: ['./ceo-managing-employees.component.css']
})
export class CeoManagingEmployeesComponent implements OnInit {
  Error:string="";
  constructor(private ManageempService:ManageEmplyeesService ) {}
  EmployeeAddForm:FormGroup=new FormGroup({
    firstName:new FormControl(null,[Validators.minLength(3),Validators.maxLength(15),Validators.required]),
    lastName:new FormControl(null,[Validators.minLength(3),Validators.maxLength(15),Validators.required]),
    userName:new FormControl(null,[Validators.minLength(3),Validators.maxLength(15),Validators.required]),
    email:new FormControl(null,[Validators.email,Validators.required]),
    phoneNumber:new FormControl(null,[Validators.pattern(/^01[0125][0-9]{8}/),Validators.required]),
    birthDate:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}/)]),
    salary:new FormControl(0,[Validators.required]),
    ssn:new FormControl(null,[Validators.required,Validators.minLength(14),Validators.maxLength(14)]),
    role:new FormControl(null,[Validators.required]),

  })

  ngOnInit(): void {
   
  }

  //register employee
  submitRegister(formInfo:FormGroup)
  {
    let registerData:EmployeeRegisterDto={
      id:formInfo.value.id,
      email:formInfo.value.email,
      firstName:formInfo.value.firstName,
      lastName:formInfo.value.lastName,
      userName:formInfo.value.userName,
      password:formInfo.value.password,
      birthDate:formInfo.value.birthDate,
      phoneNumber:formInfo.value.phoneNumber,
      ssn:formInfo.value.ssn,
      salary:formInfo.value.salary,
      role:formInfo.value.role
    };
    
    console.log(registerData);
    this.ManageempService.Register(registerData).subscribe(
      (error)=>{
        this.Error= "Email is already registered before";
        this.ManageempService.getAllEmployees().subscribe(a=>{
          console.log(a);
          
        })
      }
    );
  
  }
}
