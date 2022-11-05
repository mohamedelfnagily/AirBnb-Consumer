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

  constructor() { }

  ngOnInit(): void {

  }

}
