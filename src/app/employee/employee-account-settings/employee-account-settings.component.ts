import { Component, OnInit,SimpleChanges } from '@angular/core';
import { ManageEmplyeesService } from 'src/app/Services/manage-emplyees.service';
import { EmployeeRegisterDto } from 'src/app/ceo/Interfaces/employee-register-dto';
import { EmployeeUpdateDto } from 'src/app/ceo/Interfaces/employee-update-dto';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-employee-account-settings',
  templateUrl: './employee-account-settings.component.html',
  styleUrls: ['./employee-account-settings.component.css']
})
export class EmployeeAccountSettingsComponent implements OnInit {

  emp:EmployeeUpdateDto|null=null;
  editProfile:boolean=false;
  Error:string='';
  updateEmpDataForm:FormGroup=new FormGroup({});

  constructor(private manageEmployeeService:ManageEmplyeesService,private _ActivatedRoute:ActivatedRoute,private router:Router) { }
  file:any=null;
  uploadFile(x:any){
     this.file = <HTMLInputElement>x.target.files[0];
  }
  ngOnInit(): void {
    this.manageEmployeeService.getEmployeeById(this._ActivatedRoute.snapshot.params['id']).subscribe(
      (response)=>{
        this.emp=response;
        //Here we are giving the form its initial values
        this.updateEmpDataForm = new FormGroup({
          id:new FormControl(this._ActivatedRoute.snapshot.params['id']),
          firstName:new FormControl(this.emp?.firstName,[Validators.required,Validators.maxLength(50),Validators.minLength(3)]),
          lastName:new FormControl(this.emp?.lastName,[Validators.required,Validators.maxLength(50),Validators.minLength(3)]),
          userName:new FormControl(this.emp?.userName,[Validators.required,Validators.maxLength(50),Validators.minLength(3)]),
          email:new FormControl(this.emp?.email,[Validators.required,Validators.email]),
          phoneNumber:new FormControl(this.emp?.phoneNumber,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
          birthDate:new FormControl(this.emp?.birthDate,[Validators.required]),
          salary:new FormControl(this.emp?.salary,[Validators.required]),
          ssn:new FormControl(this.emp?.ssn,[Validators.required]),
          role:new FormControl(this.emp?.role,[Validators.required]),
          profilePicture:new FormControl(this.emp?.profilePicture)
        });
        {console.log(response)}
      },
      (error)=>{console.log(error)},
      
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  //This method is responsible for the visability of the editting form
  EditProfileVisability():void{
    this.editProfile=!this.editProfile;
  }

  submitEditForm(updateForm:FormGroup):void{
   
    let empData:EmployeeUpdateDto={
      id:this._ActivatedRoute.snapshot.params['id'],
      firstName:updateForm.value.firstName,
      lastName:updateForm.value.lastName,
      userName:updateForm.value.userName,
      birthDate:updateForm.value.birthDate,
      email:updateForm.value.email,
      phoneNumber:updateForm.value.phoneNumber,
      ssn:updateForm.value.ssn,
      salary:updateForm.value.salary,
      role:updateForm.value.role,
      profilePicture:updateForm.value.profilePicture,
    };
    
    console.log(empData);
    // let body = JSON.stringify(EmpData);
    this.manageEmployeeService.UpdateEmployee(empData,this.file).subscribe(
     
      (response)=>{console.log(response)},
      (error)=>{console.log(error)}
    );
    if(confirm('Profile Updated Successfully!')==true){
      this.router.navigateByUrl('/Admin'); 

    }
      
  }

}
