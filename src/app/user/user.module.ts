import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing/user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPropertiesComponent } from './user-properties/user-properties.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSwitchHostingComponent } from './user-switch-hosting/user-switch-hosting.component';
import { TrimtextPipe } from 'src/app/Pipes/trimtext.pipe';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserPropertiesComponent,
    UserSwitchHostingComponent,
    TrimtextPipe
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
