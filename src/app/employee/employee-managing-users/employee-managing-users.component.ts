import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Services/user.service';
import { UserReadDTO } from '../Interfaces/user-read-dto';

@Component({
  selector: 'app-employee-managing-users',
  templateUrl: './employee-managing-users.component.html',
  styleUrls: ['./employee-managing-users.component.css']
})
export class EmployeeManagingUsersComponent implements OnInit {
  users:UserReadDTO[]=[];
  loading: boolean = true;
  cols:any[]=[]
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (response)=>{
        this.users=response;
        this.loading =false;
        this.users.forEach(ele=>{
         ele.fullName=ele.firstName+" "+ele.lastName
         if(ele.profilePicture.length!=0)
          ele.picture ="data:image/png;base64,"+ ele.profilePicture;
        })
        console.log(response)
        
      },
      (error)=>{
        console.log(error);
      }
    );
    this.cols = [
      { field: 'firstName', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'phoneNumber', header: 'Phone Number' },
      {field:'birthDate',header:'Birth Date'},
      {field:'languagues',header:'languagues'}
      
  ];




  }
  Ban(id:string){
    if(confirm("Are you sure you want to ban ?")){
    this.userService.BanUser(id,5).subscribe(
      (response)=>{
        console.log(response)
        
      },
      (error)=>{
        console.log(error);
      }
    );
    }
  }

}
