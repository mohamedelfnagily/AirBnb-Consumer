import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-property-map',
  templateUrl: './property-map.component.html',
  styleUrls: ['./property-map.component.css']
})
export class PropertyMapComponent implements OnInit,OnChanges {
  options: any;
  overlays: any[]=[];
  mapSetting:any=[];
  @Input() cityLatitude:number=0;
  @Input() cityLongitude:number=0;
  constructor(private _HttpClient:HttpClient) { }
  myMap:any ;
  ngOnInit(): void {
       //Map settings
       this.options = {
        center: {lat: 31.200068, lng: 29.91876},
        zoom: 12
        };
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.options = {
      center: {lat: this.cityLatitude, lng: this.cityLongitude},
      zoom: 12
      };
      console.log(this.cityLatitude)
      console.log(this.cityLongitude)
  }

}
