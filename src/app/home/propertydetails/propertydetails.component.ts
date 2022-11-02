import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-propertydetails',
  templateUrl: './propertydetails.component.html',
  styleUrls: ['./propertydetails.component.css']
})
export class PropertydetailsComponent implements OnInit {

  constructor() { }
  value:string="";
  inline:boolean=true;
  ngOnInit(): void {
  }

}
