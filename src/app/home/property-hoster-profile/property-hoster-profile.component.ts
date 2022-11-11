import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/Interfaces/property';
import { PropertyService } from 'src/app/Services/property.service';
import { UserService } from 'src/app/Services/user.service';
import { HosterProfileDto } from '../DTOs/hoster-profile-dto';

@Component({
  selector: 'app-property-hoster-profile',
  templateUrl: './property-hoster-profile.component.html',
  styleUrls: ['./property-hoster-profile.component.css']
})
export class PropertyHosterProfileComponent implements OnInit {

  constructor(private _ActivatedRoute: ActivatedRoute, private _UserService: UserService, private _PropertyService: PropertyService,private _Router:Router) { }
  userID: string = this._ActivatedRoute.snapshot.params['id'];
  userData: HosterProfileDto | null = null;
  userImg: string = '';
  userQRCode: string = '';
  hosterProps: Property[] = [];
  propertyImages: string[] = [];
  ngOnInit(): void {
    this._UserService.getUserData(this.userID).subscribe(
      (response) => {
        this.userData = response;
        this.userImg = "data:image/png;base64," + this.userData?.profilePicture;
        this.userQRCode = "data:image/png;base64," + this.userData?.userQRCode;
        console.log(this.userData)
      },
      (error) => { 
        this._Router.navigateByUrl('NotFound');
       }
    );
    this._PropertyService.getUserProperties(this.userID).subscribe(
      (response) => {
        this.hosterProps = response;
        for (var i = 0; i < this.hosterProps.length; i++) {
          if (this.hosterProps[i].pictures.length > 0) {
            this.propertyImages.push('data:image/png;base64,' + this.hosterProps[i].pictures[0]['picture']);
          }
          else {
            this.propertyImages.push('../../../assets/Images/NotFoundImage.jpg')
          }
        }
      },
      (error) => { console.log(error) }
    );

  }

}
