import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing/user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPropertiesComponent } from './user-properties/user-properties.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSwitchHostingComponent } from './user-switch-hosting/user-switch-hosting.component';
import { TrimtextPipe } from 'src/app/Pipes/trimtext.pipe';
import { UserEditPropertyComponent } from './user-edit-property/user-edit-property.component';
import { UserFavouritePropsComponent } from './user-favourite-props/user-favourite-props.component';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';
import {RatingModule} from 'primeng/rating';

import {DataViewModule} from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { UserReviewComponent } from './user-review/user-review.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserPropertiesComponent,
    UserSwitchHostingComponent,
    TrimtextPipe,
    UserEditPropertyComponent,
    UserFavouritePropsComponent,
    UserReservationsComponent,
    UserReviewComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataViewModule,
    TagModule,
    RatingModule
  ]
})
export class UserModule { }
