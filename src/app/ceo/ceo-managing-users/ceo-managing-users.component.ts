import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { UserReadDTO } from 'src/app/employee/Interfaces/user-read-dto';
@Component({
  selector: 'app-ceo-managing-users',
  templateUrl: './ceo-managing-users.component.html',
  styleUrls: ['./ceo-managing-users.component.css']
})
export class CeoManagingUsersComponent implements OnInit {
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
