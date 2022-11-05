import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { UnAuthorizedComponent } from './core/un-authorized/un-authorized.component';
import { AuthModuleGuard } from './Guards/auth-module.guard';


const routes: Routes = [
  {path:'',redirectTo:'Home',pathMatch:'full'},
  //Lazy loaded users module
  {path:'User',loadChildren:()=>import('./user/user.module').then(u=>u.UserModule),canLoad:[AuthModuleGuard]},
  //Lazy loaded employee module
  {path:'Admin',loadChildren:()=>import('./employee/employee.module').then(e=>e.EmployeeModule),canLoad:[AuthModuleGuard]},
  //Lazy loaded ceo module
  {path:'Ceo',loadChildren:()=>import('./ceo/ceo.module').then(c=>c.CeoModule),canLoad:[AuthModuleGuard]},
  //Lazy loaded home module
  {path:"Home",loadChildren:()=>import('./home/home.module').then(h=>h.HomeModule),canLoad:[AuthModuleGuard]},
  {path:'Register',component:RegisterComponent},
  {path:'Login',component:LoginComponent},
  {path:'UnAuthorized',component:UnAuthorizedComponent},
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
