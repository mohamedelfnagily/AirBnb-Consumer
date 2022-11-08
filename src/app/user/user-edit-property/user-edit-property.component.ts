import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit-property',
  templateUrl: './user-edit-property.component.html',
  styleUrls: ['./user-edit-property.component.css']
})
export class UserEditPropertyComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute) { }
  editPropertyForm:FormGroup = new FormGroup(
    {
      
      id:new FormControl(this._ActivatedRoute.snapshot.params['id']),
      description:new FormControl(null),
      location:new FormControl(null),
      price:new FormControl(null),
      propertyType:new FormControl(null),
      maxNumberOfUsers:new FormControl(null),
      numberOfRooms:new FormControl(null),
      wifi:new FormControl(null),
      parking:new FormControl(null),
      tv:new FormControl(null),
      washer:new FormControl(null),
      elevator:new FormControl(null),
      generator:new FormControl(null),
      privateRoom:new FormControl(null),
      smokeAlarm:new FormControl(null),
      seaView:new FormControl(null),
      categoryId:new FormControl(null),
    }
  );

  submitPropertyyUpdate(propertyData:FormGroup)
  {
    
  }
  ngOnInit(): void {
  }

}
