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
  private items: MenuItem[]=[];

  constructor() { }

  ngOnInit(): void {
    this.items = [{
      label: 'File',
      items: [
          {label: 'New', icon: PrimeIcons.PLUS},
          {label: 'Open', icon: PrimeIcons.DOWNLOAD}
      ]
  },
  {
      label: 'Edit',
      items: [
          {label: 'Undo', icon: PrimeIcons.REFRESH},
      ]
  }];
  }

}
