import { Component, OnInit } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';
import {MenuItem, PrimeIcons} from 'primeng/api';
@Component({
  selector: 'app-employee-sidebar',
  templateUrl: './employee-sidebar.component.html',
  styleUrls: ['./employee-sidebar.component.css']
})
export class EmployeeSidebarComponent implements OnInit {
  display:boolean=false;
  id:any="";

  constructor() { }

  ngOnInit(): void {
   this.id=localStorage.getItem('userId');
console.log(localStorage.getItem('userId'));
  }

}
