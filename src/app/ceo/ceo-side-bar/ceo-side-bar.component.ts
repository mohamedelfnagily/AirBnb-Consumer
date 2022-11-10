import { Component, OnInit } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';
import {MenuItem, PrimeIcons} from 'primeng/api';

@Component({
  selector: 'app-ceo-side-bar',
  templateUrl: './ceo-side-bar.component.html',
  styleUrls: ['./ceo-side-bar.component.css']
})
export class CeoSideBarComponent implements OnInit {
display:boolean=false;
  constructor() { }

  ngOnInit(): void {
   
  }

}
