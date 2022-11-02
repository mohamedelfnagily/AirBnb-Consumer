import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AuthenticationGuard } from './Guards/authentication.guard';
import { AllPropertiesComponent } from './home/all-properties/all-properties.component';
import { PropertydetailsComponent } from './home/propertydetails/propertydetails.component';

const routes: Routes = [
  {path:'',redirectTo:'Home',pathMatch:'full'},
  {path:'Home',canActivate:[AuthenticationGuard],component:AllPropertiesComponent},
  {path:'PropertyDetails',canActivate:[AuthenticationGuard],component:PropertydetailsComponent},
  {path:'Register',component:RegisterComponent},
  {path:'Login',component:LoginComponent},
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
