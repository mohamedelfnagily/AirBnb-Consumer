import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/Interfaces/property';
import { PropertyService } from 'src/app/Services/property.service';
import { PropReadDTO } from '../Interfaces/prop-read-dto';
import { FilterMatchMode, PrimeNGConfig, SelectItem } from 'primeng/api';
import {FilterService} from 'primeng/api';
@Component({
  selector: 'app-employee-view-properties',
  templateUrl: './employee-view-properties.component.html',
  styleUrls: ['./employee-view-properties.component.css']
})
export class EmployeeViewPropertiesComponent implements OnInit {
  properties:PropReadDTO[]=[];
  cols:any[]=[];
  matchModeOptions: SelectItem[]=[];

  constructor(private _PropertyService:PropertyService,private filterService: FilterService) { }

  ngOnInit(): void {
    const customFilterName = 'custom-equals';

    this.filterService.register(customFilterName, (value:any, filter:any): boolean => {
      if (filter === undefined || filter === null || filter.trim() === '') {
          return true;
      }

      if (value === undefined || value === null) {
          return false;
      }

      return value.toString() === filter.toString();
  });
  this.matchModeOptions = [
    { label: 'Custom Equals', value: customFilterName },
    { label: 'Starts With', value: FilterMatchMode.STARTS_WITH },
    { label: 'Contains', value: FilterMatchMode.CONTAINS },
];

  
  this._PropertyService.getAllProperties().subscribe(
      (response)=>{
        this.properties=response;
        console.log(response)
        for(let i=0;i<this.properties.length;i++){
          if(this.properties[i].hoster.profilePicture.length!=0)
          this.properties[i].hosterProfilePicture ="data:image/png;base64,"+ this.properties[i].hoster.profilePicture;
        }
      },
      (error)=>{
        console.log(error);
      }
    );
      
    this.cols = [
      { field: 'location', header: 'Location' },
      { field: 'price', header: 'Price' },
      { field: 'rating', header: 'Rating' },
      
  ];

  }
  calculateCustomerTotal(id:any) {
    let total = 0;

    if (this.properties) {
        for (let prop of this.properties) {
            if (prop.hoster.id === id) {
                total++;
            }
        }
    }

    return total;
}

}
