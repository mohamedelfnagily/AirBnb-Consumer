import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/Services/property.service';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/Interfaces/property';
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Services/user.service';
import { HttpClient } from '@angular/common/http';
import { ReservationDetailsDto } from '../DTOs/reservation-details-dto';
import { ReservationService } from 'src/app/Services/reservation.service';

@Component({
  selector: 'app-propertydetails',
  templateUrl: './propertydetails.component.html',
  styleUrls: ['./propertydetails.component.css']
})
export class PropertydetailsComponent implements OnInit {

  constructor(private _PropertyService:PropertyService, private _ActivatedRoute:ActivatedRoute,private _UserService:UserService,private _HttpClient:HttpClient,private _ReservationService:ReservationService) {}
  //map settings
  cityLatitudeParent:number=0;
  cityLongitudeParent:number=0;
  // 
  value:string="";
  startDateValue: Date=new Date();
  endDateValue: Date=new Date();
  numberOfDays:number = 0;
  inline:boolean=true;
  myProperty:any;
  myPropertyImages:any[]=[];
  userId:string='';
  userImg:string='';
  ngOnInit(): void {
   let myVal:string = this._ActivatedRoute.snapshot.params['id'];
   this.myProperty = this._PropertyService.getProperty(myVal).subscribe(
    (response)=>{
      this.myProperty=response;
      this.userImg ="data:image/png;base64,"+ this.myProperty.hoster.profilePicture;
      this.userId = response.hoster.id;
      for(var i=0;i<5;i++)
      {
        if(this.myProperty.pictures[i])
        {
          this.myPropertyImages.push('data:image/png;base64,'+this.myProperty.pictures[i]['picture']);
        }
        else{
          this.myPropertyImages.push('../../../assets/Images/NotFoundImage.jpg')
        }
      }
      console.log(response);
      console.log(this.myPropertyImages);
    },
    (error)=>{console.log(error)}
   );
  this.getMapData();

  }

  setDate(){
    this.numberOfDays = this.endDateValue.getDate()-this.startDateValue.getDate();
    console.log(this.numberOfDays)

  }
  //This method is responsible for retrieving the latitude and longitude of the city to show it on map
  getMapData()
  {
    let headers =  {
      'X-RapidAPI-Key': '428700df75mshca784c01d8b51f1p137bf6jsn0f9dc762d150',
      'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
    }
    this._HttpClient.get('https://trueway-geocoding.p.rapidapi.com/Geocode?address=Alexandria,egypt&language=en',{headers:headers}).subscribe(
      (response)=>{
        let mapSetting:any=response;
       this.cityLatitudeParent = mapSetting.results[0]['location']['lat'];
       this.cityLongitudeParent = mapSetting.results[0]['location']['lng'];
      },
      (error)=>{console.log(error)}
    );
  }
  //This method is responsible for  setting the reservation details
  setReservationDetails()
  {
    let resrvDetails:ReservationDetailsDto={
      PropertyId:this.myProperty.id,
      UserId:JSON.stringify(localStorage.getItem('userId')),
      StartDate:this.startDateValue.toLocaleDateString("en-US"),
      EndDate:this.endDateValue.toLocaleDateString("en-US"),
      TotalPriceBeforeAddinService:(this.numberOfDays*this.myProperty.price),
      ServiceFee:20,
      CleaningFee:10,
      TotalPrice:((this.numberOfDays*this.myProperty.price)+30),
      NumberOfDaysPrice:`$${this.myProperty.price} X ${this.numberOfDays} nights`
    }
    this._ReservationService.setReservationDetails(resrvDetails);
  }
  //Add New reservation
  
}
